Feature: Container Selection
    As a user I want to select a container with predefined or custom size.
    When I add products the page should show me the total volume in cubic metric and the remaining volume.

    Scenario: Default container is selected
        Given the main page
        Then I see the 20ft container is selected
        And container volume is 33
        And the total volume is 0