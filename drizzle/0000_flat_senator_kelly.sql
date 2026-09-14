CREATE TABLE `study_activities` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`student` text DEFAULT 'Narmada' NOT NULL,
	`subject` text NOT NULL,
	`activity_type` text DEFAULT 'lesson' NOT NULL,
	`duration_seconds` integer DEFAULT 0 NOT NULL,
	`score` integer,
	`answer` text DEFAULT '' NOT NULL,
	`completed_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
