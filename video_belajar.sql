CREATE TABLE `user` (
  `user_id` integer PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255),
  `full_name` varchar(255),
  `alamat` varchar(255),
  `email` varchar(255),
  `password` varchar(255),
  `date_of_birth` date,
  `gender` enum(L : P),
  `created_at` timestamp
);

CREATE TABLE `order` (
  `order_id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer COMMENT 'foreign key',
  `kelas_id` varchar(foreign key),
  `order_date` timestamp,
  `status` enum(pending,completed,canceled),
  `created_at` timestamp
);

CREATE TABLE `pembayaran` (
  `pembayaran_id` integer PRIMARY KEY,
  `user_id` integer(foreign key user_id relasi ke user),
  `order_id` integer(foreign key orde_id relasi ke order),
  `amount` decimal,
  `payment_date` timestamp,
  `status` enum(pending,complete,failed)
);

CREATE TABLE `kelas` (
  `kelas_id` integer PRIMARY KEY AUTO_INCREMENT,
  `kelas_name` varchar(255),
  `kategori_id` integer(note,foreign key kategori_id relasi ke kategori),
  `tutor_id` integer(note,foreign key tutor_id relasi ke tutor),
  `deskripsi` text,
  `harga` decimal
);

CREATE TABLE `tutor` (
  `tutor_id` integer PRIMARY KEY AUTO_INCREMENT,
  `full_name` varchar(255),
  `bio` text,
  `email` varchar(255)
);

CREATE TABLE `material` (
  `material_id` integer PRIMARY KEY AUTO_INCREMENT,
  `kelas_id` integer(note,foreign key kelas_id relasi ke kelas),
  `material_type` enum(rangkuman,video,quiz),
  `content` text
);

CREATE TABLE `produk` (
  `produk_id` integer PRIMARY KEY AUTO_INCREMENT,
  `kelas_id` integer(note,foreign key kelas_id relasi ke kelas),
  `produk_name` varchar(255),
  `deskripsi` text,
  `harga` decimal,
  'image_path' varchar(255),
  'image_name' varchar(255)
);

CREATE TABLE `kategori` (
  `kategori_id` integer PRIMARY KEY AUTO_INCREMENT,
  `kategori_name` varchar(255)
);

CREATE TABLE `modul` (
  `modul_id` integer PRIMARY KEY AUTO_INCREMENT,
  `kelas_id` integer(note,foreign key kelas_id relasi ke kelas),
  `modul_name` varchar(255)
);

CREATE TABLE `pretest` (
  `pretest_id` integer PRIMARY KEY AUTO_INCREMENT,
  `kelas_id` integer(note,foreign key kelas_id relasi ke kelas),
  `questions` text
);

ALTER TABLE `order` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `pembayaran` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `material` ADD FOREIGN KEY (`kelas_id`) REFERENCES `kelas` (`kelas_id`);

ALTER TABLE `modul` ADD FOREIGN KEY (`kelas_id`) REFERENCES `kelas` (`kelas_id`);

ALTER TABLE `pretest` ADD FOREIGN KEY (`kelas_id`) REFERENCES `kelas` (`kelas_id`);

ALTER TABLE `produk` ADD FOREIGN KEY (`kelas_id`) REFERENCES `kelas` (`kelas_id`);

ALTER TABLE `kelas` ADD FOREIGN KEY (`kelas_id`) REFERENCES `tutor` (`tutor_id`);

ALTER TABLE `kelas` ADD FOREIGN KEY (`kategori_id`) REFERENCES `kategori` (`kategori_id`);

ALTER TABLE `pembayaran` ADD FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`);

ALTER TABLE `order` ADD FOREIGN KEY (`kelas_id`) REFERENCES `kelas` (`kelas_id`);
