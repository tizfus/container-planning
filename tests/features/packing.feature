Feature: Container packing

  Scenario: Packs products into a single layer
    Given a container with length 590cm width 235cm height 239cm
    And 1 products have length 100cm width 100cm height 100cm
    When products are packed
    Then there are 1 layers
    And the first layer should have 1 products