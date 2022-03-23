-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 23 mars 2022 à 20:42
-- Version du serveur :  10.4.18-MariaDB
-- Version de PHP : 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `generationfoot`
--

-- --------------------------------------------------------

--
-- Structure de la table `centres`
--

CREATE TABLE `centres` (
  `id` int(11) NOT NULL,
  `nom` varchar(250) NOT NULL,
  `adresse` varchar(250) NOT NULL,
  `code_postale` int(5) NOT NULL,
  `ville` varchar(250) NOT NULL,
  `id_entreprise` int(11) NOT NULL,
  `Actif` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `centres`
--

INSERT INTO `centres` (`id`, `nom`, `adresse`, `code_postale`, `ville`, `id_entreprise`, `Actif`) VALUES
(2, 'Centre Montigny', '1 Avenue du foot', 95120, 'Montigny les cormeilles', 1, b'1'),
(3, 'Centre Gennevilliers', '2 rue Machin', 92300, 'Gennevilliers', 1, b'1');

-- --------------------------------------------------------

--
-- Structure de la table `emplacements`
--

CREATE TABLE `emplacements` (
  `id` int(11) NOT NULL,
  `libelle` varchar(250) NOT NULL,
  `actif` tinyint(1) NOT NULL,
  `id_ctr` int(11) NOT NULL,
  `typeEmplacement` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `emplacements`
--

INSERT INTO `emplacements` (`id`, `libelle`, `actif`, `id_ctr`, `typeEmplacement`) VALUES
(1, 'Salle 1', 1, 2, 'Intérieur'),
(3, 'Salle 2', 1, 2, 'Extérieur'),
(4, 'Salle Arena', 1, 3, 'Intérieur'),
(5, 'Salle New Camp', 1, 3, 'Extérieur');

-- --------------------------------------------------------

--
-- Structure de la table `entreprise`
--

CREATE TABLE `entreprise` (
  `id` int(11) NOT NULL,
  `nom` varchar(250) NOT NULL,
  `adresse` varchar(250) NOT NULL,
  `code_postale` varchar(5) NOT NULL,
  `ville` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `entreprise`
--

INSERT INTO `entreprise` (`id`, `nom`, `adresse`, `code_postale`, `ville`) VALUES
(1, 'Géneration Foot', '1 rue Maurice Audin', '78500', 'Sartrouville');

-- --------------------------------------------------------

--
-- Structure de la table `reservation`
--

CREATE TABLE `reservation` (
  `id` int(11) NOT NULL,
  `actif_du` datetime NOT NULL,
  `actif_au` datetime(1) NOT NULL,
  `id_stade` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `montant` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `reservation`
--

INSERT INTO `reservation` (`id`, `actif_du`, `actif_au`, `id_stade`, `id_user`, `montant`) VALUES
(82, '2021-10-31 09:30:00', '2021-10-31 10:30:00.0', 4, 5, '100'),
(83, '2021-10-31 09:30:00', '2021-10-31 10:30:00.0', 5, 5, '80'),
(85, '2021-11-01 18:30:00', '2021-11-01 19:30:00.0', 9, 9, '100'),
(86, '2021-11-01 09:30:00', '2021-11-01 10:30:00.0', 10, 9, '80'),
(87, '2021-11-01 09:30:00', '2021-11-01 10:30:00.0', 2, 9, '100'),
(93, '2021-11-02 09:30:00', '2021-11-02 10:30:00.0', 8, 9, '100'),
(95, '2021-11-02 09:30:00', '2021-11-02 10:30:00.0', 5, 9, '80'),
(97, '2021-11-02 09:30:00', '2021-11-02 10:30:00.0', 3, 9, '80'),
(98, '2021-11-13 09:30:00', '2021-11-13 10:30:00.0', 4, 9, '100'),
(99, '2021-11-18 09:30:00', '2021-11-18 10:30:00.0', 8, 9, '100'),
(102, '2021-11-02 15:30:00', '2021-11-02 16:30:00.0', 2, 9, '100'),
(104, '2021-12-31 09:30:00', '2021-12-31 10:30:00.0', 11, 9, '80');

-- --------------------------------------------------------

--
-- Structure de la table `stade`
--

CREATE TABLE `stade` (
  `id` int(11) NOT NULL,
  `libelle` varchar(250) NOT NULL,
  `id_emplacement` int(11) NOT NULL,
  `id_type_terrain` int(11) NOT NULL,
  `actif` tinyint(1) NOT NULL,
  `avecCamera` bit(1) NOT NULL,
  `tarif` decimal(18,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `stade`
--

INSERT INTO `stade` (`id`, `libelle`, `id_emplacement`, `id_type_terrain`, `actif`, `avecCamera`, `tarif`) VALUES
(2, 'Jean Jaurès', 1, 1, 1, b'1', '100.00'),
(3, 'Boris Bovin', 1, 2, 1, b'1', '80.00'),
(4, 'Charles DG', 3, 1, 1, b'0', '100.00'),
(5, 'Edith Piaf', 3, 2, 1, b'1', '80.00'),
(6, 'Maradonna', 3, 1, 1, b'0', '100.00'),
(7, 'Pelé', 1, 1, 1, b'0', '100.00'),
(8, 'Messi', 4, 1, 1, b'1', '100.00'),
(9, 'Ronaldo', 4, 1, 1, b'1', '100.00'),
(10, 'Ibrahimovic', 4, 2, 1, b'0', '80.00'),
(11, 'Kids Foot', 5, 2, 1, b'1', '80.00'),
(12, 'Platini', 5, 1, 1, b'0', '100.00'),
(13, 'Romario', 5, 1, 1, b'1', '100.00');

-- --------------------------------------------------------

--
-- Structure de la table `terrain_classique`
--

CREATE TABLE `terrain_classique` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `terrain_enfant`
--

CREATE TABLE `terrain_enfant` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `type_terrain`
--

CREATE TABLE `type_terrain` (
  `id` int(11) NOT NULL,
  `libelle` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `type_terrain`
--

INSERT INTO `type_terrain` (`id`, `libelle`) VALUES
(1, 'Terrain classique'),
(2, 'Terrain pour enfants');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `username` varchar(250) NOT NULL,
  `actif` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `username`, `actif`) VALUES
(5, 'skilippage@hotmail.com', '57b472bdf2cf967a8a9b862717be0cfccd5260121823076c9bcd3762bf1a0096', 'jamalovic', 1),
(9, 'badr@badr.fr', '36e5236fcd4c61044949678014f0d0b337384d2c0ee41dda458bda5c57f2fc68', 'salut', 1),
(10, 'prep@prep.fr', 'b10b18f906fcd1ca87847667a5011cd5974171625d4173caf48507d49d5d68ee', 'prep', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `centres`
--
ALTER TABLE `centres`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_ENTREPRISE` (`id_entreprise`);

--
-- Index pour la table `emplacements`
--
ALTER TABLE `emplacements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_CENTRE` (`id_ctr`);

--
-- Index pour la table `entreprise`
--
ALTER TABLE `entreprise`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_STADE_RESERVATION` (`id_stade`),
  ADD KEY `FK_USER_RESERVATION` (`id_user`);

--
-- Index pour la table `stade`
--
ALTER TABLE `stade`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_EMPLACEMENT_STADE` (`id_emplacement`),
  ADD KEY `FK_TYPE_TERRAIN_STADE` (`id_type_terrain`);

--
-- Index pour la table `terrain_classique`
--
ALTER TABLE `terrain_classique`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `terrain_enfant`
--
ALTER TABLE `terrain_enfant`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `type_terrain`
--
ALTER TABLE `type_terrain`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `centres`
--
ALTER TABLE `centres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `emplacements`
--
ALTER TABLE `emplacements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `entreprise`
--
ALTER TABLE `entreprise`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT pour la table `stade`
--
ALTER TABLE `stade`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `terrain_classique`
--
ALTER TABLE `terrain_classique`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `terrain_enfant`
--
ALTER TABLE `terrain_enfant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `type_terrain`
--
ALTER TABLE `type_terrain`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `centres`
--
ALTER TABLE `centres`
  ADD CONSTRAINT `FK_ENTREPRISE` FOREIGN KEY (`id_entreprise`) REFERENCES `entreprise` (`id`);

--
-- Contraintes pour la table `emplacements`
--
ALTER TABLE `emplacements`
  ADD CONSTRAINT `FK_CENTRE` FOREIGN KEY (`id_ctr`) REFERENCES `centres` (`id`);

--
-- Contraintes pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `FK_STADE_RESERVATION` FOREIGN KEY (`id_stade`) REFERENCES `stade` (`id`),
  ADD CONSTRAINT `FK_USER_RESERVATION` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `stade`
--
ALTER TABLE `stade`
  ADD CONSTRAINT `FK_EMPLACEMENT_STADE` FOREIGN KEY (`id_emplacement`) REFERENCES `emplacements` (`id`),
  ADD CONSTRAINT `FK_TYPE_TERRAIN_STADE` FOREIGN KEY (`id_type_terrain`) REFERENCES `type_terrain` (`id`);

--
-- Contraintes pour la table `terrain_classique`
--
ALTER TABLE `terrain_classique`
  ADD CONSTRAINT `FK_TT_TC` FOREIGN KEY (`id`) REFERENCES `type_terrain` (`id`);

--
-- Contraintes pour la table `terrain_enfant`
--
ALTER TABLE `terrain_enfant`
  ADD CONSTRAINT `FK_TT_TE` FOREIGN KEY (`id`) REFERENCES `type_terrain` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
