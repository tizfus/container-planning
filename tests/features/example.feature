Feature: Example Test
  As a user
  I want to verify the testing setup is working
  So that I can write more tests

  Scenario: Open a webpage
    Given I am on "https://example.com"
    When I take a screenshot
    Then I should see "Example Domain"
