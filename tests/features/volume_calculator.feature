Feature: Volume Calculator
    As a user I want to provide products size
    and the page should show me the total volume in cubic metric

    Scenario Outline: Calculate volume for a product
        Given a product with length <length> width <width> height <height>
        Then the total volume is <expected>
        And there are 1 line
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
        Given a product with length 200.9 width 200.9 height 200.9
        Then length should be 200
        And width should be 200
        And the height should be 200

    Scenario: Letters are not allowed in any field
        When I type "abc123" in the length field
        And I type "abc123" in the width field
        And I type "abc123" in the height field
        And I type "abc123" in the quantity field
        Then length should be 123
        And width should be 123
        And the height should be 123
        And the quantity should be 123

    Scenario: Calculate volume for multiple products
        Given a product with length 550 width 777 height 125
        And a product with length 200 width 300 height 400
        Then the total volume is 77
        And there are 2 line
        And last line is ready for the next product



    Scenario: Remove first product and volume should be zero
        Given a product with any size
        When the volume is different than zero
        And there are 1 line
        Then I remove the first product
        And the total volume is 0

    Scenario: Remove a product and reduce volume
        Given a product with length 527 width 557 height 536
        And a product with length 436 width 648 height 232
        When the total volume is 223
        And there are 2 line
        And I remove the last product
        Then the total volume is 157
        And there are 1 line

    Scenario: No products but I press remove
        Given no products
        When I remove the first product
        Then there are 0 line
        And last line is ready for the next product
        And the total volume is 0



    Scenario: Two products with same size
        Given 2 products with length 200 width 300 height 400
        Then the total volume is 48
        And there are 1 line
        And last line is ready for the next product

    Scenario: Products with size but quantity is zero
        Given 0 products with length 200 width 300 height 400
        Then the total volume is 0
        And there are 1 line
        And last line is ready for the next product