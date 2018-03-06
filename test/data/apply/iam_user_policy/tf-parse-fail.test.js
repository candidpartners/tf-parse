const Plan      = require('../../../../lib/index').Plan;
const path = require('path');
const fs = require('fs');

let plan = new Plan();

let terraformOutput = fs.readFileSync(__dirname + '/aws-iam-user-policy-does-not-exist-terraform-output.txt').toString();

describe("tf-parse recognizes resources", () => {
    test("tf-parse can recognize iam_user_policy", () => {
        let user_policy_parse = plan.parse(terraformOutput);

        expect(terraformOutput.includes("aws_iam_user")).toBeTruthy();
        expect(terraformOutput.includes("aws_iam_user_policy_attachment")).toBeTruthy();

        expect(user_policy_parse.add).toHaveProperty("aws_iam_user");
        expect(user_policy_parse.add).toHaveProperty("aws_iam_user_policy_attachment")
    });
});




