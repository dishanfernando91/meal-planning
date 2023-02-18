#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { MealPlanningStack } from "../lib/meal-planning-stack";
import * as dotenv from "dotenv";

// if (!process.env.TABLE_NAME) {
//   throw new Error("Missing Meals Table Name");
// }

dotenv.config();

const app = new cdk.App();

new MealPlanningStack(app, "MealPlanningStack", {});
