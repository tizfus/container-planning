Feature: Container Selection
    As a user I want to select a container with predefined or custom size.
    When I add products the page should show me the total volume in cubic metric and the remaining volume.

    Scenario: Default container is selected
        Given no products
        Then the 20ft container is the selected container
        And container volume is 33
        And the total volume is 0


    Scenario: I reach the maximum volume of the container
        Given a product with length 320 width 320 height 320
        When the 20ft container is selected
        Then the container volume element is white

    Scenario: I exceed the maximum volume of the container
        Given a product with length 400 width 320 height 320
        When the 20ft container is selected
        Then the container volume element is red