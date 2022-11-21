Feature: Shout

    Shouty allows users to "hear" other users' "shouts" as long as they are close neough to each other.

    TODO:
        - only shout to people with a certain distance

    Background:
        Given a person named Lucy
        And a person named Sean

    Rule: Shouts can be hear by other users

        Scenario: Listener hears a message
            When Sean shouts "free bagels at Sean's"
            Then Lucy should hear Sean's message

        Scenario: Listener hears a different message
            When Sean shouts "Free coffee!"
            Then Lucy should hear Sean's message
    
    Rule: Shouts should only be heard if listener is within range

        Scenario: Listener is within range

        Scenario: Listener is out of range