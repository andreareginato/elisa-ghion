CREATE TABLE IF NOT EXISTS `collaborations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`initials` text NOT NULL,
	`website` text NOT NULL,
	`category` text NOT NULL,
	`image` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `gallery_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`src` text NOT NULL,
	`alt` text NOT NULL,
	`caption` text NOT NULL,
	`category` text NOT NULL,
	`span` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `research_areas` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`question` text NOT NULL,
	`description` text NOT NULL,
	`quote` text NOT NULL,
	`influences` text NOT NULL,
	`related_workshops` text NOT NULL,
	`image` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `site_settings` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `testimonials` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`workshop_id` text NOT NULL,
	`quote` text NOT NULL,
	`name` text NOT NULL,
	`year` text NOT NULL,
	FOREIGN KEY (`workshop_id`) REFERENCES `workshops`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `videos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`embed_url` text NOT NULL,
	`thumbnail` text NOT NULL,
	`category` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `workshops` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`subtitle` text NOT NULL,
	`description` text NOT NULL,
	`long_description` text NOT NULL,
	`highlights` text NOT NULL,
	`start_date` text NOT NULL,
	`end_date` text,
	`dates` text NOT NULL,
	`location` text NOT NULL,
	`external_url` text DEFAULT '' NOT NULL,
	`image` text NOT NULL,
	`format` text NOT NULL,
	`schedule` text,
	`period` text,
	`sort_order` integer DEFAULT 0 NOT NULL
);
