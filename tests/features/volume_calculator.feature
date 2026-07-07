Feature: Volume Calculator
    As a user I want to provide products size
    and the page should show me the total volume in cubic metric

    Scenario: Calculate volume for a product
        Given a product with length "200" width "300" height "400"
        When I check the volume
        Then the total volume should be "24"

    Scenario: Decimal values are not allowed
        Given a product with length "200.9" width "200.9" height "200.9"
        When I check size inputs
        Then length should be "200"
        And width should be "200"
        And the height should be "200"