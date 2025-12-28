CREATE TABLE `todos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`completed` integer DEFAULT false NOT NULL,
	`organization_id` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch())
);
