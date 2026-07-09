Feature: Volume Calculator
    As a user I want to provide products size
    and the page should show me the total volume in cubic metric

    Scenario Outline: Calculate volume for a product
        Given a product with length "<length>" width "<width>" height "<height>"
        Then the total volume should be "<expected>"
        And there should be "1" products
        And last line is ready for the next product

        Examples:
            | length | width | height | expected |
            | 550    | 777   | 125    | 53       |
            | 550    | 780   | 125    | 54       |
            | 200    | 300   | 400    | 24       |
            | 200    | 300   | 445    | 27       |
            | 100    | 100   | 100    | 1        |
            | 300    | 200   | 150    | 9        |
            | 500    | 300   | 10     | 2        |
            | 200    | 200   | 200    | 8        |

    Scenario: Decimal values are not allowed
        Given a product with length "200.9" width "200.9" height "200.9"
        Then length should be "200"
        And width should be "200"
        And the height should be "200"

    Scenario: Calculate volume for multiple products
        Given a product with length "550" width "777" height "125"
        And a product with length "200" width "300" height "400"
        Then the total volume should be "77"
        And there should be "2" products
        And last line is ready for the next product