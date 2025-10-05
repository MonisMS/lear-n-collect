import { pgTable, timestamp, serial, varchar, text, char, integer } from "drizzle-orm/pg-core";


export const user = pgTable('users',{
    id:serial('id').primaryKey(),
    username:varchar('username',{length:100}).notNull(),
    email: varchar('email',{length:100}).notNull().unique(),
    password_hash:varchar('password_hash',{length:255}).notNull(),
    created_at:timestamp('created_at').defaultNow().notNull(),
})

export const question = pgTable('questions',{
    id:serial('id').primaryKey(),
    question_text:text('question_text').notNull(),
    option_a: text('option_a').notNull(),          
    option_b: text('option_b').notNull(),          
    option_c: text('option_c').notNull(),          
    option_d: text('option_d').notNull(),  
    correct_answer:char('correct_answer',{length:1}).notNull(),
    field:varchar('field',{length:100}).notNull(),
    topic:varchar('topic',{length:50}).notNull(),
    level:varchar('level',{length:50}).notNull(),
    created_at:timestamp('created_at').defaultNow().notNull(),

})

export const userProgress = pgTable('user_progress',{
    id:serial('id').primaryKey(),
    user_id:integer('user_id').notNull().references(()=>user.id),
    field:varchar('field',{length:100}).notNull(),
    topic:varchar('topic',{length:50}).notNull(),
    level:varchar('level',{length:50}).notNull(),
    questions_answered:integer('questions_answered').default(0).notNull(),
    correct_answers:integer('correct_answers').default(0).notNull(),
    total_questions:integer('total_questions').default(0).notNull(),
    created_at:timestamp('created_at').defaultNow().notNull(),
    
})