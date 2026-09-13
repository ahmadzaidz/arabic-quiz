# arabic-quiz

## context
There is a lot of online content already to learn Arabic, even published in English. The problem is that consuming content does not help you learn the language. Practice does. 

## goal
Create the simplest possible way for me to practice Arabic, built on mastery learning principles. 

## roadmap
- Based on Qalam Institute textbook first, build out exercises for a unit of grammar that I want practice on
- Figure out how to roadmap
- Adopt boot.dev "Spellbook" philosophy

## logic of script.js

                    START
                      │
                      ▼
                render()
                      │
                      ▼
             Get current queue
                      │
                      ▼
             Show current question
                      │
                      ▼
              User clicks answer
                      │
                      ▼
               handleAnswer()
                      │
                      ▼
              Is answer correct?
                /           \
              YES            NO
               │              │
               │        Add question
               │        to review queue
               │              │
               └──────┬───────┘
                      ▼
              Show explanation
                      │
                      ▼
                User clicks
                   Next
                      │
                      ▼
             currentIndex++
                      │
                      ▼
                  render()
                      │
                      ▼
              More questions?
                /           \
              YES            NO
               │              │
               │       Are there review
               │        questions?
               │          /       \
               │        YES        NO
               │         │          │
               │         ▼          ▼
               │      REVIEW      RESULTS
               │         │
               │         ▼
               │   Review wrong
               │   questions
               │         │
               │         ▼
               │      RESULTS
               │
               └── repeat