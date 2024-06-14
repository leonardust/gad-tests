# This file contain concept decisions for GAD automation framework

# Table of Contents

1. Integration of code style tools in framework
2. Use of dotenv in automated tests
3. Use of design patterns like POM, AAA, and composition
4. Use of faker in automated tests
5. Use of models in automated tests
6. Use of factory in automated tests
7. Introduce view in automated test architecture

## Integration of code style tools in framework <a id="integration-of-code-style-tools-in-framework"></a>

**ID**: 001  
**Status**: Decided  
**Date**: 2023/07/12  
**Context**:
We need static code analysis tools for:

- unified code standard in framework
- better code readability
- easy code formatting actions

**Proposed solution**

- ESLint for linting coding rules for TypeScript files
- Prettier for formatting files
- Husky for running linting scripts

**Pros**: Tools automate formatting and code style maintenance activities

**Cons**: New tools add more complexity to solution and require maintenance

**Decision**: Use Prettier, ESLint and Husky to provide hight code standard across framework

**Creator**: Przemek B

## Use of dotenv in automated tests <a id="use-of-dotenv-in-automated-tests"></a>

**ID**: 002  
**Status**: Decided  
**Date**: 2023/07/12  
**Context**:

**Proposed solution**

- **Pros**:

  **Cons**:

  **Decision**:

  **Creator**: Przemek B

## Use of design patterns like POM, AAA, and composition <a id="use-of-design-patterns-like-pom-aaa-and-composition"></a>

**ID**: 003  
**Status**: Decided  
**Date**: 2023/07/12  
**Context**:

**Proposed solution**

**Pros**:

**Cons**:

**Decision**:

**Creator**: Przemek B

## Use of faker in automated tests <a id="use-of-faker-in-automated-tests"></a>

**ID**: 004
**Status**: Decided
**Date**: 2023/07/26
**Context**: In our automated tests, we often encounter the need to populate test data with realistic but randomized values, such as names, addresses, dates, and other user-specific information.

**Proposed solution**: Integrate the 'faker' library into our automated tests to generate realistic and randomized test data.

**Pros**:

- Realistic test data - The 'faker' library provides a wide range of data generation options, allowing us to create diverse and realistic test scenarios.
- Time-saving - Automating the data generation process with 'faker' significantly reduces the time spent on writing and maintaining test data setup.
- Increased test coverage - By using 'faker,' we can easily create various data combinations, enhancing our test suite's coverage.

**Cons**:

- Dependency management - We need to ensure that the 'faker' library is correctly installed and managed across our test environments.
- Slower tests - Adding faker slows down test by additional logic and abstraction.
- Random Data Challenges - Random data produced by faker, in some cases can be inappropriate for our needs, that force additional effort to customize faker outputs.

**Decision**: Decided.

**Creator**: Przemek B

## Use of models in automated tests <a id="use-of-models-in-automated-tests"></a>

**ID**: 005
**Status**: Decided
**Date**: 2023/07/26
**Context**: In our automated tests, we need to better manage our test data in context of user registration

**Proposed solution**: Introduce user.model as representation of data structure.

**Pros**:

- Aggregation of various data in a single object
- Easier data passing to functions (only one object that contains all the data)
- Protection against potential errors if certain values are forgotten

**Cons**:

- Requires careful consideration of interfaces to avoid code duplication.

**Decision**: Decided.

**Creator**: Przemek B

## Use of factory in automated tests <a id="use-of-factory-in-automated-tests"></a>

**ID**: 006
**Status**: Decided
**Date**: 2023/07/26
**Context**: In our automated tests, we need to better manage our test data.

**Proposed solution**: Move creation user data logic from tests to factory.

**Pros**:

- Separation of concerns – the pattern allows you to separate the process of creating objects from their actual usage. This way, you can focus on how to use the objects, rather than how they are created.
- Ease of making changes – when the way an object is created changes, you only need to update it in one place, without modifying code in multiple locations.
- Increased readability – objects are created in one place (in the factory). As a result, the code that creates objects is more organized and readable.

**Cons**:

- Increased complexity – introduces a new layer of abstraction, which can make the code slightly more complicated, especially in simple tests.
- Higher initial effort – creating the factory class and specific model classes may require more work upfront compared to creating objects directly.

**Decision**: Decided.

**Creator**: Przemek B

**ID**: 007
**Status**: Decided
**Date**: 2023/07/26
**Context**: Some pages in our app have the same url but different content and structure

**Proposed solution**: Introduce view as element with different content but the same url.

**Pros**:

- Better orientation which app pages are accessible by url address (pages) and which only by interaction with elements (views).

**Cons**:

**Decision**: Decided.

**Creator**: Przemek B
