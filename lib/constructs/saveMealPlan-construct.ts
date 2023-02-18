// import {
//   aws_lambda as lambda,
//   aws_apigateway as apigw,
//   NestedStackProps,
// } from "aws-cdk-lib";
// import { RestApi } from "aws-cdk-lib/aws-apigateway";
// import { Construct } from "constructs";
// import * as path from "path";

// export interface SaveMealPlanProps extends NestedStackProps {
//   readonly api: RestApi;
// }

// export class SaveMealPlanConstruct extends Construct {
//   constructor(scope: Construct, id: string, props: SaveMealPlanProps) {
//     super(scope, id, props);

//     const saveMealLambda = new lambda.Function(this, "save-meal-lambda", {
//       code: lambda.Code.fromAsset(
//         path.join(__dirname, "../lambdaFns/saveMealPlan.lambda")
//       ),
//       runtime: lambda.Runtime.NODEJS_16_X,
//       handler: "index.handler",
//     });

//     this.api = new apigw.RestApi(this, "meal-plan-rest-api", {
//       restApiName: "meal-plan-api",
//       defaultCorsPreflightOptions: {
//         allowOrigins: apigw.Cors.ALL_ORIGINS,
//         allowMethods: apigw.Cors.ALL_METHODS,
//       },
//     });

//     const saveMealLambdaInt = new apigw.LambdaIntegration(saveMealLambda);

//     this.api.root.addMetho("POST", saveMealLambdaInt);
//   }
// }
