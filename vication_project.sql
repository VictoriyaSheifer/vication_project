-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 31, 2021 at 10:35 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.4.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vication_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` int(11) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'vika', 'sh', 'v@g.com', '123', 1, '2021-06-15 13:24:27', '2021-06-15 13:24:27'),
(5, 'rachel', 'bin', 'r@g.com', '123', 0, '2021-06-15 13:27:11', '2021-06-15 13:27:11'),
(7, 'david', 'd', 'd@d.com', '123', 0, '2021-06-15 13:34:30', '2021-06-15 13:34:30'),
(8, 'sivan', 's', 's@s.com', '123', 0, '2021-06-15 13:40:50', '2021-06-15 13:40:50'),
(9, 'faina', 'f', 'f@g.com', '123', 0, '2021-06-15 16:30:46', '2021-06-15 16:30:46'),
(26, 'veronica', 'vi', 'vi@g.com', '123', 0, '2021-06-18 14:58:00', '2021-06-18 14:58:00'),
(27, 'vi', 'vi', 'vi@g.com', '123', 0, '2021-07-31 20:24:10', '2021-07-31 20:24:10'),
(28, 'lola', 'ly', 'l@g.com', '123', 0, '2021-07-31 20:33:43', '2021-07-31 20:33:43'),
(29, 'soye', 'le', 'sssvi@g.com', '123', 0, '2021-07-31 20:34:23', '2021-07-31 20:34:23');

-- --------------------------------------------------------

--
-- Table structure for table `user_vacations`
--

CREATE TABLE `user_vacations` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_vacations`
--

INSERT INTO `user_vacations` (`createdAt`, `updatedAt`, `userId`, `vacationId`) VALUES
('2021-07-02 14:57:19', '2021-07-02 14:57:19', 1, 2),
('2021-07-31 19:02:41', '2021-07-31 19:02:41', 5, 1),
('2021-07-31 17:50:41', '2021-07-31 17:50:41', 5, 2),
('2021-07-31 17:50:43', '2021-07-31 17:50:43', 5, 3),
('2021-07-02 15:03:40', '2021-07-02 15:03:40', 7, 3),
('2021-07-27 10:48:11', '2021-07-27 10:48:11', 7, 8),
('2021-07-27 10:48:13', '2021-07-27 10:48:13', 7, 12),
('2021-07-25 08:16:21', '2021-07-25 08:16:21', 8, 2),
('2021-07-27 10:49:23', '2021-07-27 10:49:23', 9, 1),
('0000-00-00 00:00:00', '0000-00-00 00:00:00', 9, 2),
('2021-07-27 10:49:20', '2021-07-27 10:49:20', 9, 3),
('2021-07-27 10:49:27', '2021-07-27 10:49:27', 9, 6),
('2021-07-27 10:49:25', '2021-07-27 10:49:25', 9, 9),
('2021-07-25 13:51:02', '2021-07-25 13:51:02', 26, 2),
('2021-07-27 10:48:39', '2021-07-27 10:48:39', 26, 3),
('2021-07-27 10:48:41', '2021-07-27 10:48:41', 26, 6),
('2021-07-27 10:48:44', '2021-07-27 10:48:44', 26, 9),
('2021-07-27 10:48:45', '2021-07-27 10:48:45', 26, 11),
('2021-07-31 20:33:48', '2021-07-31 20:33:48', 28, 1),
('2021-07-31 20:33:50', '2021-07-31 20:33:50', 28, 3),
('2021-07-31 20:33:52', '2021-07-31 20:33:52', 28, 6),
('2021-07-31 20:33:53', '2021-07-31 20:33:53', 28, 7),
('2021-07-31 20:34:32', '2021-07-31 20:34:32', 29, 10),
('2021-07-31 20:34:32', '2021-07-31 20:34:32', 29, 11),
('2021-07-31 20:34:30', '2021-07-31 20:34:30', 29, 12);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `id` int(11) NOT NULL,
  `destination` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `start_date` date NOT NULL DEFAULT current_timestamp(),
  `end_date` date NOT NULL DEFAULT current_timestamp(),
  `price` int(11) NOT NULL,
  `picture` varchar(255) DEFAULT 'defult.jpg',
  `num_of_followers` int(11) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`id`, `destination`, `description`, `start_date`, `end_date`, `price`, `picture`, `num_of_followers`, `createdAt`, `updatedAt`) VALUES
(1, 'Barcelona', 'Tree days in the sweet and dilated barcelona', '2021-06-16', '2021-06-18', 330, 'barcelona.jpg', 3, '2021-06-16 19:19:34', '2021-07-31 20:33:48'),
(2, 'Bora-Bora', 'A vacation you never dreamed of, endless peace, sea and sun all day. Live on a desert island for four days, perfection.', '2021-06-15', '2021-06-18', 326, 'bora-bora.jpg', 5, '2021-06-16 19:21:35', '2021-07-31 17:50:41'),
(3, 'Crete-Greece', 'Spectacular views full of blue, good food full of vitamin D at a price for every pocket. A perfect vacation for refreshment.', '2021-06-16', '2021-06-16', 226, 'crete-greece.jpg', 5, '2021-06-16 19:23:14', '2021-07-31 20:33:50'),
(6, 'Tel Aviv', 'A young and modern metropolis with a diverse population, Tel Aviv was established only in 1909. Clubs, bars, and a thriving art community.', '2021-07-20', '2021-07-20', 726, 'tel-aviv.jpg', 3, '2021-07-20 18:31:30', '2021-07-31 20:33:52'),
(7, 'Sydney', 'Sydney offers an urban mix of rich history and contemporary buzz, but with a distinctly Australian spirit. To understand why this city is so singular, take the clifftop coastal walk from Bondi to Coogee, where you’ll pass by beaches, rock pools, and lush ', '2021-07-20', '2021-07-20', 1026, 'sydney.jpg', 1, '2021-07-20 18:33:42', '2021-07-31 20:33:53'),
(8, 'Siem Reap Cambodia', 'When sunlight illuminates the temples and ruins covered with Angkor Wat plants even a simple sunrise over Siem Reap is a significant event. The ancient buildings are located in one of the largest religious complexes in the world.', '2021-07-20', '2021-07-20', 826, 'siem-reap-cambodia.jpg', 1, '2021-07-20 18:35:43', '2021-07-31 17:49:27'),
(9, 'Rome', 'The sprawling city of Rome remains one of the most significant stops in the world, thanks to its seamless blend of Old World wonders and modern delights.', '2021-07-20', '2021-07-20', 626, 'rome.jpg', 2, '2021-07-20 18:38:24', '2021-07-31 17:08:03'),
(10, 'Paris', 'Nowhere else on earth makes the heart swoon like the mention of Paris. The city lures with its magnificent art, architecture, culture, and cuisine, but there’s also a quieter magic waiting to be explored.', '2021-07-20', '2021-07-20', 626, 'paris.jpg', 1, '2021-07-20 18:39:53', '2021-07-31 20:34:32'),
(11, 'New York City', 'The tallest buildings, biggest museums, and best pizza—NYC is a city of superlatives, and it lives up to every one of them. From the dazzling spectacle of Broadway to MoMA’s world-class galleries, the boutiques of SoHo.', '2021-07-20', '2021-07-20', 626, 'new-york-city.jpg', 2, '2021-07-20 18:41:26', '2021-07-31 20:34:32'),
(12, 'London', 'London is layered with history, where medieval and Victorian complement a rich and vibrant modern world. The Tower of London and Westminster neighbor local pubs and markets.', '2021-07-21', '2021-07-21', 866, 'london.jpg', 2, '2021-07-21 08:14:21', '2021-07-31 20:34:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_vacations`
--
ALTER TABLE `user_vacations`
  ADD PRIMARY KEY (`userId`,`vacationId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_vacations`
--
ALTER TABLE `user_vacations`
  ADD CONSTRAINT `user_vacations_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_vacations_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
