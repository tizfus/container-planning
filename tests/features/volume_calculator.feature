Feature: Volume Calculator
    As a user I want to provide products size
    and the page should show me the total volume in cubic metric

    Scenario Outline: Calculate volume for a product
        Given a product with length "<length>" width "<width>" height "<height>"
        When I check the volume
        Then the total volume should be "<expected>"

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
        When I check size inputs
        Then length should be "200"
        And width should be "200"
        And the height should be "200"