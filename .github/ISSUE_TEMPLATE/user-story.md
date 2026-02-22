---
name: User Story
about: Define a new piece of functionality from the user perspective.
labels: ['user-story']
body:
  - type: textarea
    id: story
    attributes:
      label: User Story
      placeholder: 'As a [role], I want to [action], so that [value].'
    validations:
      required: true
  - type: textarea
    id: criteria
    attributes:
      label: Acceptance Criteria
      placeholder: "- [ ] User can click X\n- [ ] Database updates Y"
---
