CREATE TABLE IF NOT EXISTS `users` (
`id` INT NULL,
`name` VARCHAR(MAX) NULL,
`username` VARCHAR(MAX) NULL,
`email` VARCHAR(MAX) NULL,
`password` VARCHAR(MAX) NULL,
`img` VARCHAR(MAX) NULL,
`date_create` VARCHAR(MAX) NULL
);

INSERT INTO track_users VALUES
(0,'Chelsea Holden','user0','user0@gmail.com',md5('pass'),'https://via.placeholder.com/400/798/fff/?text=user0','2022-03-14 05:15:51'),
(1,'Lindsey Dillard','user1','user1@gmail.com',md5('pass'),'https://via.placeholder.com/400/751/fff/?text=user1','2022-01-30 03:26:42'),
(2,'Wright Sosa','user2','user2@gmail.com',md5('pass'),'https://via.placeholder.com/400/935/fff/?text=user2','2022-02-05 06:47:01'),
(3,'Simpson Rollins','user3','user3@gmail.com',md5('pass'),'https://via.placeholder.com/400/704/fff/?text=user3','2022-03-09 10:33:04'),
(4,'Tameka Mullen','user4','user4@gmail.com',md5('pass'),'https://via.placeholder.com/400/893/fff/?text=user4','2022-04-02 01:59:04'),
(5,'Lowe Mays','user5','user5@gmail.com',md5('pass'),'https://via.placeholder.com/400/964/fff/?text=user5','2022-02-28 12:20:13'),
(6,'Edith Underwood','user6','user6@gmail.com',md5('pass'),'https://via.placeholder.com/400/718/fff/?text=user6','2022-01-14 02:53:08'),
(7,'Irene Murray','user7','user7@gmail.com',md5('pass'),'https://via.placeholder.com/400/714/fff/?text=user7','2022-02-16 10:11:02'),
(8,'Maddox Turner','user8','user8@gmail.com',md5('pass'),'https://via.placeholder.com/400/733/fff/?text=user8','2022-01-09 04:01:36'),
(9,'Hall Albert','user9','user9@gmail.com',md5('pass'),'https://via.placeholder.com/400/876/fff/?text=user9','2022-02-01 02:08:45');