Feature: Container packing
    As a user I want the function that organize the product in the container to be "smart"
    And able to place the product in the correct order and layer

  Scenario: Single product into a single layer
    Given a container with length 590cm width 235cm height 239cm
    And 1 products have length 100cm width 100cm height 100cm
    When products are packed
    Then there are 1 layers
    And layer no. 1 has 1 products
  
  Scenario: One product fill the entire container
    Given a container with length 590cm width 235cm height 239cm
    And 1 products have length 590cm width 235cm height 233cm
    When products are packed
    Then there are 1 layers
    And layer no. 1 has 1 products

  Scenario: Two products with half of the height of the container, should fill the entire container
    Given a container with length 590cm width 235cm height 239cm
    And 2 products have length 590cm width 235cm height 119cm
    When products are packed
    Then there are 2 layers
    And layer no. 1 has 1 products
    And layer no. 2 has 1 products

  Scenario: Two products with half of the width of the container, should fill the entire container
    Given a container with length 590cm width 235cm height 239cm
    And 2 products have length 590cm width 117cm height 239cm
    When products are packed
    Then there are 1 layers
    And layer no. 1 has 2 products

  Scenario: Two products with half of the length of the container, should fill the entire container
    Given a container with length 590cm width 235cm height 239cm
    And 2 products have length 295cm width 235cm height 239cm
    When products are packed
    Then there are 1 layers
    And layer no. 1 has 2 products

  Scenario: Single product but too large and cannot be placed in the container
    Given a container with length 590cm width 235cm height 239cm
    And 1 products have length 590cm width 235cm height 240cm
    When products are packed
    Then there are 0 layers
    And container is overfilled