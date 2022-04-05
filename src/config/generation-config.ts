export const MIN_AMOUNT_COURSES = 1;
export const MAX_AMOUNT_COURSES = 50;
export const COURSE_TYPES: string[] = [
    "Back-End", "Front-End", "Basic", "QA"
]
export const COURSES_MAP: Map<string, string[]> = new Map([
    ["Back-End", ['Java Core', 'Java Backend']],
    ["Front-End", ['CSS, HTML, JS', 'React']],
    ["Basic", ['Basic Programming']],
    ["QA", ['QA Manual', 'QA Automation']]
])