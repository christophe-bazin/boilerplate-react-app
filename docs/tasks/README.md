# 📋 Tasks Directory

This directory contains individual task files for the Next.js SaaS Boilerplate project.

## 🔢 Task Numbering

- **Next task number**: Read from `NEXT_TASK_NUMBER.txt`
- **Format**: `TASK-XXX.md` (e.g., `TASK-032.md`)
- **Auto-increment**: When creating a new task, increment the number in `NEXT_TASK_NUMBER.txt`

## 📝 Task File Structure

Each task file should follow this template:

```markdown
# TASK-XXX: [Task Title]

**Type**: [Feature|Bug Fix|Refactoring|Documentation|etc.]
**Priority**: [🔴 P0|🟠 P1|🟡 P2|🟢 P3]
**Status**: [Pending|In Progress|Completed]

## Description
Brief description of what needs to be done.

## Problem
Detailed explanation of the current issue or requirement.

## Implementation
- [ ] Step 1
- [ ] Step 2
- [ ] Step 3

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Technical Requirements
- Specific technical constraints
- Dependencies
- Performance requirements

## Security Requirements (if applicable)
- Security considerations
- Best practices to follow

## Testing Requirements
- [ ] Unit tests
- [ ] Integration tests
- [ ] Manual testing steps
```

## 🔄 Workflow

1. **Select Task**: Choose a task file from this directory (prioritize 🔴 P0 and 🟠 P1)
2. **Implement**: Follow the task requirements and acceptance criteria
3. **Test**: Run `npm run type-check` and `npm run build`
4. **Commit**: Use format `[type]: [TASK-XXX] [description]`
5. **Complete**: Delete the task file when implementation is done

## 📊 Priority Legend

- 🔴 **P0** - Critical/Blocking
- 🟠 **P1** - High Priority
- 🟡 **P2** - Medium Priority
- 🟢 **P3** - Low Priority/Nice-to-have

## 🏷️ Task Types

- **Feature**: New functionality
- **Bug Fix**: Fixing existing issues
- **Refactoring**: Code improvements without functional changes
- **Documentation**: Documentation updates
- **Performance**: Performance optimizations
- **Security**: Security improvements
- **Testing**: Test implementation or improvements