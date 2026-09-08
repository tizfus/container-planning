Feature: Container packing
    As a user I want the function that organize the product in the container to be "smart"
    And able to place the product in the correct order and layer


  Scenario: Single product into a single layer
    Given 1 products with length 100 width 100 height 100
    When the 20ft container is selected
    Then there are 1 layers
    And layer no. 1 has 1 products
  
  Scenario: One product fill the entire container
    Given 1 products with length 590 width 235 height 233
    When the 20ft container is selected
    Then there are 1 layers
    And layer no. 1 has 1 products

  Scenario: Two products with half of the height of the container, should fill the entire container
    Given 2 products with length 590 width 235 height 119
    When the 20ft container is selected
    Then there are 2 layers
    And layer no. 1 has 1 products
    And layer no. 2 has 1 products

  Scenario: Two products with half of the width of the container, should fill the entire container
    Given 2 products with length 590 width 117 height 239
    When the 20ft container is selected
    Then there are 1 layers
    And layer no. 1 has 2 products

  Scenario: Two products with half of the length of the container, should fill the entire container
    Given 2 products with length 295 width 235 height 239
    When the 20ft container is selected
    Then there are 1 layers
    And layer no. 1 has 2 products

  Scenario: Single product but too large and cannot be placed in the container
    Given 1 products with length 590 width 235 height 240
    When the 20ft container is selected
    Then there are 0 layers
    And container is overfilled