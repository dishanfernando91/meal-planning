import * as cdk from "aws-cdk-lib";
import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";

import { GetMealPlanConstruct } from "./constructs/getMealPlan-construct";

export class MealPlanningStack extends cdk.Stack {
  private readonly props: StackProps;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new GetMealPlanConstruct(this, "MealPlanConstruct", {});
  }
}
