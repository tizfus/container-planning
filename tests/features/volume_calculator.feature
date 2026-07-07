Feature: Volume Calculator
    As a user I want to provide products size
    and the page should show me the total volume amount in cubic metric

    Scenario: One product
        Given a product with length "2" width "3" height "4"
        When I check the volume
        Then the total volume should be "24"