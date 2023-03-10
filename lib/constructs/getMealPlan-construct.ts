import {
  aws_lambda as lambda,
  aws_apigateway as apigw,
  aws_dynamodb as dynamo,
  RemovalPolicy,
} from "aws-cdk-lib";
import { RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import * as path from "path";

export interface GetMealPlanProps {}

export class GetMealPlanConstruct extends Construct {
  public readonly table: dynamo.Table;
  private readonly api: RestApi;

  constructor(scope: Construct, id: string, props: GetMealPlanProps) {
    super(scope, id);

    this.table = new dynamo.Table(this, "MEALS_TABLE", {
      removalPolicy: RemovalPolicy.DESTROY,
      billingMode: dynamo.BillingMode.PAY_PER_REQUEST,
      pointInTimeRecovery: false,
      partitionKey: {
        name: "id",
        type: dynamo.AttributeType.STRING,
      },
    });

    const getMealsLambda = new lambda.Function(this, "get-meals-lambda", {
      code: lambda.Code.fromAsset(
        path.join(__dirname, "../lambdaFns/getMealPlan.lambda")
      ),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: "index.handler",
    });

    const saveMealLambda = new lambda.Function(this, "save-meal-lambda", {
      code: lambda.Code.fromAsset(
        path.join(__dirname, "../lambdaFns/saveMealPlan.lambda")
      ),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: "index.handler",
    });

    this.table.grantReadWriteData(getMealsLambda);
    this.table.grantReadWriteData(saveMealLambda);

    this.api = new apigw.RestApi(this, "meal-plan-rest-api", {
      restApiName: "meal-plan-api",
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS,
      },
    });

    const getMealsLambdaInt = new apigw.LambdaIntegration(getMealsLambda);
    const saveMealLambdaInt = new apigw.LambdaIntegration(saveMealLambda);

    this.api.root.addMethod("GET", getMealsLambdaInt);
    this.api.root.addMethod("POST", saveMealLambdaInt);
  }
}
