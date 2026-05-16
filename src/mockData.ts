import type { Game, Review } from './types';

export const games: Game[] = [
  {
    "id": "act-1",
    "title": "Ghost of Tsushima",
    "developer": "Sucker Punch",
    "releaseYear": 2020,
    "genre": "Action",
    "rating": 87,
    "coverImage": "https://media.rawg.io/media/games/f24/f2493ea338fe7bd3c7d73750a85a0959.jpeg",
    "heroImage": "https://media.rawg.io/media/games/f24/f2493ea338fe7bd3c7d73750a85a0959.jpeg"
  },
  {
    "id": "act-2",
    "title": "Devil May Cry 5",
    "developer": "Capcom",
    "releaseYear": 2019,
    "genre": "Action",
    "rating": 88,
    "coverImage": "https://media.rawg.io/media/games/9fb/9fbf956a16249def7625ab5dc3d09515.jpg",
    "heroImage": "https://media.rawg.io/media/games/9fb/9fbf956a16249def7625ab5dc3d09515.jpg"
  },
  {
    "id": "act-3",
    "title": "Bayonetta 3",
    "developer": "PlatinumGames",
    "releaseYear": 2022,
    "genre": "Action",
    "rating": 86,
    "coverImage": "https://media.rawg.io/media/games/c30/c30ac50cb13096f5402250bf666a321c.jpg",
    "heroImage": "https://media.rawg.io/media/games/c30/c30ac50cb13096f5402250bf666a321c.jpg"
  },
  {
    "id": "act-4",
    "title": "Sekiro: Shadows Die Twice",
    "developer": "FromSoftware",
    "releaseYear": 2019,
    "genre": "Action",
    "rating": 91,
    "coverImage": "https://media.rawg.io/media/games/67f/67f62d1f062a6164f57575e0604ee9f6.jpg",
    "heroImage": "https://media.rawg.io/media/games/67f/67f62d1f062a6164f57575e0604ee9f6.jpg"
  },
  {
    "id": "act-5",
    "title": "Sifu",
    "developer": "Sloclap",
    "releaseYear": 2022,
    "genre": "Action",
    "rating": 81,
    "coverImage": "https://media.rawg.io/media/games/3a9/3a9ea2db24f879e61fe7b824f5888d2a.jpg",
    "heroImage": "https://media.rawg.io/media/games/3a9/3a9ea2db24f879e61fe7b824f5888d2a.jpg"
  },
  {
    "id": "act-6",
    "title": "Ninja Gaiden Master Collection",
    "developer": "Koei Tecmo",
    "releaseYear": 2021,
    "genre": "Action",
    "rating": 78,
    "coverImage": "https://media.rawg.io/media/games/4ba/4ba82cbd691f84df4f63ed6dfa74e5f7.jpg",
    "heroImage": "https://media.rawg.io/media/games/4ba/4ba82cbd691f84df4f63ed6dfa74e5f7.jpg"
  },
  {
    "id": "act-7",
    "title": "Astral Chain",
    "developer": "PlatinumGames",
    "releaseYear": 2019,
    "genre": "Action",
    "rating": 87,
    "coverImage": "https://media.rawg.io/media/games/75b/75b91d05160c819fa6bbafe920548300.jpg",
    "heroImage": "https://media.rawg.io/media/games/75b/75b91d05160c819fa6bbafe920548300.jpg"
  },
  {
    "id": "act-8",
    "title": "Hades",
    "developer": "Supergiant Games",
    "releaseYear": 2020,
    "genre": "Action",
    "rating": 93,
    "coverImage": "https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg",
    "heroImage": "https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg"
  },
  {
    "id": "act-9",
    "title": "Dead Cells",
    "developer": "Motion Twin",
    "releaseYear": 2018,
    "genre": "Action",
    "rating": 89,
    "coverImage": "https://media.rawg.io/media/games/f90/f90ee1a4239247a822771c40488e68c5.jpg",
    "heroImage": "https://media.rawg.io/media/games/f90/f90ee1a4239247a822771c40488e68c5.jpg"
  },
  {
    "id": "act-10",
    "title": "Katana ZERO",
    "developer": "Askiisoft",
    "releaseYear": 2019,
    "genre": "Action",
    "rating": 83,
    "coverImage": "https://media.rawg.io/media/games/d37/d37e110ddcc0bd52d99f0f647b737a0a.jpg",
    "heroImage": "https://media.rawg.io/media/games/d37/d37e110ddcc0bd52d99f0f647b737a0a.jpg"
  },
  {
    "id": "adv-1",
    "title": "God of War Ragnarok",
    "developer": "Santa Monica Studio",
    "releaseYear": 2022,
    "genre": "Action-Adventure",
    "rating": 94,
    "coverImage": "https://media.rawg.io/media/screenshots/3c4/3c4c51b66741363d83b56ce66b1240ec.jpg",
    "heroImage": "https://media.rawg.io/media/screenshots/3c4/3c4c51b66741363d83b56ce66b1240ec.jpg"
  },
  {
    "id": "adv-2",
    "title": "Horizon Forbidden West",
    "developer": "Guerrilla Games",
    "releaseYear": 2022,
    "genre": "Action-Adventure",
    "rating": 88,
    "coverImage": "https://media.rawg.io/media/games/bf7/bf73b105ccbba42107986bbcd96fcada.jpg",
    "heroImage": "https://media.rawg.io/media/games/bf7/bf73b105ccbba42107986bbcd96fcada.jpg"
  },
  {
    "id": "adv-3",
    "title": "Marvel's Spider-Man 2",
    "developer": "Insomniac Games",
    "releaseYear": 2023,
    "genre": "Action-Adventure",
    "rating": 90,
    "coverImage": "https://media.rawg.io/media/games/7ae/7ae5a14cdb4ab222a134c15f4629e430.jpg",
    "heroImage": "https://media.rawg.io/media/games/7ae/7ae5a14cdb4ab222a134c15f4629e430.jpg"
  },
  {
    "id": "adv-4",
    "title": "Uncharted 4: A Thief's End",
    "developer": "Naughty Dog",
    "releaseYear": 2016,
    "genre": "Action-Adventure",
    "rating": 93,
    "coverImage": "https://media.rawg.io/media/games/709/709bf81f874ce5d25d625b37b014cb63.jpg",
    "heroImage": "https://media.rawg.io/media/games/709/709bf81f874ce5d25d625b37b014cb63.jpg"
  },
  {
    "id": "adv-5",
    "title": "Shadow of the Tomb Raider",
    "developer": "Eidos-Montréal",
    "releaseYear": 2018,
    "genre": "Action-Adventure",
    "rating": 82,
    "coverImage": "https://media.rawg.io/media/games/7f6/7f6cd70ba2ad57053b4847c13569f2d8.jpg",
    "heroImage": "https://media.rawg.io/media/games/7f6/7f6cd70ba2ad57053b4847c13569f2d8.jpg"
  },
  {
    "id": "adv-6",
    "title": "Star Wars Jedi: Survivor",
    "developer": "Respawn",
    "releaseYear": 2023,
    "genre": "Action-Adventure",
    "rating": 85,
    "coverImage": "https://media.rawg.io/media/games/3e4/3e43e29ae126ef951842393f5ff7f33a.jpg",
    "heroImage": "https://media.rawg.io/media/games/3e4/3e43e29ae126ef951842393f5ff7f33a.jpg"
  },
  {
    "id": "adv-7",
    "title": "Control",
    "developer": "Remedy",
    "releaseYear": 2019,
    "genre": "Action-Adventure",
    "rating": 85,
    "coverImage": "https://media.rawg.io/media/games/253/2534a46f3da7fa7c315f1387515ca393.jpg",
    "heroImage": "https://media.rawg.io/media/games/253/2534a46f3da7fa7c315f1387515ca393.jpg"
  },
  {
    "id": "adv-8",
    "title": "Alan Wake 2",
    "developer": "Remedy",
    "releaseYear": 2023,
    "genre": "Action-Adventure",
    "rating": 89,
    "coverImage": "https://media.rawg.io/media/games/5b9/5b963d7633cd640fa2dbc4069d1c6377.jpg",
    "heroImage": "https://media.rawg.io/media/games/5b9/5b963d7633cd640fa2dbc4069d1c6377.jpg"
  },
  {
    "id": "adv-9",
    "title": "Batman: Arkham Knight",
    "developer": "Rocksteady",
    "releaseYear": 2015,
    "genre": "Action-Adventure",
    "rating": 87,
    "coverImage": "https://media.rawg.io/media/games/310/3106b0e012271c5ffb16497b070be739.jpg",
    "heroImage": "https://media.rawg.io/media/games/310/3106b0e012271c5ffb16497b070be739.jpg"
  },
  {
    "id": "adv-10",
    "title": "Ratchet & Clank: Rift Apart",
    "developer": "Insomniac",
    "releaseYear": 2021,
    "genre": "Action-Adventure",
    "rating": 88,
    "coverImage": "https://media.rawg.io/media/games/ccf/ccfd3fd488a8ed61145a3da96c080131.jpg",
    "heroImage": "https://media.rawg.io/media/games/ccf/ccfd3fd488a8ed61145a3da96c080131.jpg"
  },
  {
    "id": "rpg-1",
    "title": "Elden Ring",
    "developer": "FromSoftware",
    "releaseYear": 2022,
    "genre": "Role-Playing (RPG)",
    "rating": 96,
    "coverImage": "https://media.rawg.io/media/games/b29/b294fdd866dcdb643e7bab370a552855.jpg",
    "heroImage": "https://media.rawg.io/media/games/b29/b294fdd866dcdb643e7bab370a552855.jpg"
  },
  {
    "id": "rpg-2",
    "title": "Baldur's Gate 3",
    "developer": "Larian Studios",
    "releaseYear": 2023,
    "genre": "Role-Playing (RPG)",
    "rating": 96,
    "coverImage": "https://media.rawg.io/media/games/699/69907ecf13f172e9e144069769c3be73.jpg",
    "heroImage": "https://media.rawg.io/media/games/699/69907ecf13f172e9e144069769c3be73.jpg"
  },
  {
    "id": "rpg-3",
    "title": "Starfield",
    "developer": "Bethesda",
    "releaseYear": 2023,
    "genre": "Role-Playing (RPG)",
    "rating": 83,
    "coverImage": "https://media.rawg.io/media/games/ba8/ba82c971336adfd290e4c0eab6504fcf.jpg",
    "heroImage": "https://media.rawg.io/media/games/ba8/ba82c971336adfd290e4c0eab6504fcf.jpg"
  },
  {
    "id": "rpg-4",
    "title": "Cyberpunk 2077",
    "developer": "CD Projekt Red",
    "releaseYear": 2020,
    "genre": "Role-Playing (RPG)",
    "rating": 86,
    "coverImage": "https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg",
    "heroImage": "https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg"
  },
  {
    "id": "rpg-5",
    "title": "Final Fantasy VII Rebirth",
    "developer": "Square Enix",
    "releaseYear": 2024,
    "genre": "Role-Playing (RPG)",
    "rating": 92,
    "coverImage": "https://media.rawg.io/media/games/511/511995d5dfcf18965dbb354d2ba9e176.jpg",
    "heroImage": "https://media.rawg.io/media/games/511/511995d5dfcf18965dbb354d2ba9e176.jpg"
  },
  {
    "id": "rpg-6",
    "title": "The Witcher 3: Wild Hunt",
    "developer": "CD Projekt Red",
    "releaseYear": 2015,
    "genre": "Role-Playing (RPG)",
    "rating": 93,
    "coverImage": "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
    "heroImage": "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg"
  },
  {
    "id": "rpg-7",
    "title": "Persona 5 Royal",
    "developer": "Atlus",
    "releaseYear": 2019,
    "genre": "Role-Playing (RPG)",
    "rating": 95,
    "coverImage": "https://media.rawg.io/media/games/a9c/a9c789951de65da545d51f664b4f2ce0.jpg",
    "heroImage": "https://media.rawg.io/media/games/a9c/a9c789951de65da545d51f664b4f2ce0.jpg"
  },
  {
    "id": "rpg-8",
    "title": "Dragon Age: Dreadwolf",
    "developer": "BioWare",
    "releaseYear": 2024,
    "genre": "Role-Playing (RPG)",
    "rating": 0,
    "coverImage": "https://media.rawg.io/media/games/4c5/4c5a391237b78ea96aeff8206f63d3f5.jpg",
    "heroImage": "https://media.rawg.io/media/games/4c5/4c5a391237b78ea96aeff8206f63d3f5.jpg"
  },
  {
    "id": "rpg-9",
    "title": "Mass Effect Legendary Edition",
    "developer": "BioWare",
    "releaseYear": 2021,
    "genre": "Role-Playing (RPG)",
    "rating": 90,
    "coverImage": "https://media.rawg.io/media/games/64e/64e2a77f37ddc48d102127234af99886.jpg",
    "heroImage": "https://media.rawg.io/media/games/64e/64e2a77f37ddc48d102127234af99886.jpg"
  },
  {
    "id": "rpg-10",
    "title": "Fallout 4",
    "developer": "Bethesda",
    "releaseYear": 2015,
    "genre": "Role-Playing (RPG)",
    "rating": 84,
    "coverImage": "https://media.rawg.io/media/games/d82/d82990b9c67ba0d2d09d4e6fa88885a7.jpg",
    "heroImage": "https://media.rawg.io/media/games/d82/d82990b9c67ba0d2d09d4e6fa88885a7.jpg"
  },
  {
    "id": "sim-1",
    "title": "Microsoft Flight Simulator",
    "developer": "Asobo",
    "releaseYear": 2020,
    "genre": "Simulation",
    "rating": 91,
    "coverImage": "https://media.rawg.io/media/games/89c/89ceadfd42109aa0d80e9c5dbc86f277.jpg",
    "heroImage": "https://media.rawg.io/media/games/89c/89ceadfd42109aa0d80e9c5dbc86f277.jpg"
  },
  {
    "id": "sim-2",
    "title": "The Sims 4",
    "developer": "Maxis",
    "releaseYear": 2014,
    "genre": "Simulation",
    "rating": 70,
    "coverImage": "https://media.rawg.io/media/games/e44/e445335e611b4ccf03af71fffcbd30a4.jpg",
    "heroImage": "https://media.rawg.io/media/games/e44/e445335e611b4ccf03af71fffcbd30a4.jpg"
  },
  {
    "id": "sim-3",
    "title": "Cities: Skylines II",
    "developer": "Colossal Order",
    "releaseYear": 2023,
    "genre": "Simulation",
    "rating": 74,
    "coverImage": "https://media.rawg.io/media/games/aa5/aa581a715c1afd3d3abdef4669e73852.jpg",
    "heroImage": "https://media.rawg.io/media/games/aa5/aa581a715c1afd3d3abdef4669e73852.jpg"
  },
  {
    "id": "sim-4",
    "title": "Stardew Valley",
    "developer": "ConcernedApe",
    "releaseYear": 2016,
    "genre": "Simulation",
    "rating": 89,
    "coverImage": "https://media.rawg.io/media/games/713/713269608dc8f2f40f5a670a14b2de94.jpg",
    "heroImage": "https://media.rawg.io/media/games/713/713269608dc8f2f40f5a670a14b2de94.jpg"
  },
  {
    "id": "sim-5",
    "title": "Euro Truck Simulator 2",
    "developer": "SCS Software",
    "releaseYear": 2012,
    "genre": "Simulation",
    "rating": 79,
    "coverImage": "https://media.rawg.io/media/games/1f5/1f5ddf7199f2778ff83663b93b5cb330.jpg",
    "heroImage": "https://media.rawg.io/media/games/1f5/1f5ddf7199f2778ff83663b93b5cb330.jpg"
  },
  {
    "id": "sim-6",
    "title": "Animal Crossing: New Horizons",
    "developer": "Nintendo",
    "releaseYear": 2020,
    "genre": "Simulation",
    "rating": 90,
    "coverImage": "https://media.rawg.io/media/games/42f/42fe1abd4d7c11ca92d93a0fb0f8662b.jpg",
    "heroImage": "https://media.rawg.io/media/games/42f/42fe1abd4d7c11ca92d93a0fb0f8662b.jpg"
  },
  {
    "id": "sim-7",
    "title": "Farming Simulator 22",
    "developer": "Giants Software",
    "releaseYear": 2021,
    "genre": "Simulation",
    "rating": 76,
    "coverImage": "https://media.rawg.io/media/games/dd9/dd90964966f6bf9b0bd635be432fbf8a.jpg",
    "heroImage": "https://media.rawg.io/media/games/dd9/dd90964966f6bf9b0bd635be432fbf8a.jpg"
  },
  {
    "id": "sim-8",
    "title": "Planet Zoo",
    "developer": "Frontier Developments",
    "releaseYear": 2019,
    "genre": "Simulation",
    "rating": 81,
    "coverImage": "https://media.rawg.io/media/screenshots/38f/38f484631d76603231be8bedf658f646.jpg",
    "heroImage": "https://media.rawg.io/media/screenshots/38f/38f484631d76603231be8bedf658f646.jpg"
  },
  {
    "id": "sim-9",
    "title": "Kerbal Space Program 2",
    "developer": "Intercept Games",
    "releaseYear": 2023,
    "genre": "Simulation",
    "rating": 72,
    "coverImage": "https://media.rawg.io/media/games/25f/25fb9e95ffcb3a7127e298e99850b11a.jpeg",
    "heroImage": "https://media.rawg.io/media/games/25f/25fb9e95ffcb3a7127e298e99850b11a.jpeg"
  },
  {
    "id": "sim-10",
    "title": "PowerWash Simulator",
    "developer": "FuturLab",
    "releaseYear": 2022,
    "genre": "Simulation",
    "rating": 75,
    "coverImage": "https://media.rawg.io/media/games/659/65959a07c4e6dc7a9034993bbb3ba232.jpg",
    "heroImage": "https://media.rawg.io/media/games/659/65959a07c4e6dc7a9034993bbb3ba232.jpg"
  },
  {
    "id": "str-1",
    "title": "Civilization VI",
    "developer": "Firaxis Games",
    "releaseYear": 2016,
    "genre": "Strategy",
    "rating": 88,
    "coverImage": "https://media.rawg.io/media/games/997/997ab4d67e96fb20a4092383477d4463.jpg",
    "heroImage": "https://media.rawg.io/media/games/997/997ab4d67e96fb20a4092383477d4463.jpg"
  },
  {
    "id": "str-2",
    "title": "StarCraft II",
    "developer": "Blizzard",
    "releaseYear": 2010,
    "genre": "Strategy",
    "rating": 93,
    "coverImage": "https://media.rawg.io/media/games/960/9605c08bf8535c00adbb0a3896f0c484.jpg",
    "heroImage": "https://media.rawg.io/media/games/960/9605c08bf8535c00adbb0a3896f0c484.jpg"
  },
  {
    "id": "str-3",
    "title": "XCOM 2",
    "developer": "Firaxis Games",
    "releaseYear": 2016,
    "genre": "Strategy",
    "rating": 88,
    "coverImage": "https://media.rawg.io/media/games/9bf/9bfac18ff678f41a4674250fa0e04a52.jpg",
    "heroImage": "https://media.rawg.io/media/games/9bf/9bfac18ff678f41a4674250fa0e04a52.jpg"
  },
  {
    "id": "str-4",
    "title": "Total War: Warhammer III",
    "developer": "Creative Assembly",
    "releaseYear": 2022,
    "genre": "Strategy",
    "rating": 85,
    "coverImage": "https://media.rawg.io/media/games/0fc/0fcb485572f6074c611521984a033a5c.jpg",
    "heroImage": "https://media.rawg.io/media/games/0fc/0fcb485572f6074c611521984a033a5c.jpg"
  },
  {
    "id": "str-5",
    "title": "Age of Empires IV",
    "developer": "Relic",
    "releaseYear": 2021,
    "genre": "Strategy",
    "rating": 81,
    "coverImage": "https://media.rawg.io/media/games/23e/23e45acbf29bd241913ddcf5cf4053d5.jpg",
    "heroImage": "https://media.rawg.io/media/games/23e/23e45acbf29bd241913ddcf5cf4053d5.jpg"
  },
  {
    "id": "str-6",
    "title": "Fire Emblem Engage",
    "developer": "Intelligent Systems",
    "releaseYear": 2023,
    "genre": "Strategy",
    "rating": 80,
    "coverImage": "https://media.rawg.io/media/games/4c4/4c41c96a4ecbbff9ed23f62590e9b720.jpg",
    "heroImage": "https://media.rawg.io/media/games/4c4/4c41c96a4ecbbff9ed23f62590e9b720.jpg"
  },
  {
    "id": "str-7",
    "title": "Crusader Kings III",
    "developer": "Paradox",
    "releaseYear": 2020,
    "genre": "Strategy",
    "rating": 91,
    "coverImage": "https://media.rawg.io/media/games/77e/77e8a4a7b377a081aabd0dbf688417e1.jpg",
    "heroImage": "https://media.rawg.io/media/games/77e/77e8a4a7b377a081aabd0dbf688417e1.jpg"
  },
  {
    "id": "str-8",
    "title": "Manor Lords",
    "developer": "Slavic Magic",
    "releaseYear": 2024,
    "genre": "Strategy",
    "rating": 84,
    "coverImage": "https://media.rawg.io/media/screenshots/885/8853972ba3d2baa7270cda2fed3ddc06.jpg",
    "heroImage": "https://media.rawg.io/media/screenshots/885/8853972ba3d2baa7270cda2fed3ddc06.jpg"
  },
  {
    "id": "str-9",
    "title": "Stellaris",
    "developer": "Paradox",
    "releaseYear": 2016,
    "genre": "Strategy",
    "rating": 78,
    "coverImage": "https://media.rawg.io/media/games/92b/92bbf8a451e2742ab812a580546e593a.jpg",
    "heroImage": "https://media.rawg.io/media/games/92b/92bbf8a451e2742ab812a580546e593a.jpg"
  },
  {
    "id": "str-10",
    "title": "Frostpunk 2",
    "developer": "11 bit studios",
    "releaseYear": 2024,
    "genre": "Strategy",
    "rating": 85,
    "coverImage": "https://media.rawg.io/media/games/a73/a732e6a5261699e1ba3a3c1c3926a7b7.jpg",
    "heroImage": "https://media.rawg.io/media/games/a73/a732e6a5261699e1ba3a3c1c3926a7b7.jpg"
  },
  {
    "id": "sho-1",
    "title": "Call of Duty: Modern Warfare III",
    "developer": "Sledgehammer",
    "releaseYear": 2023,
    "genre": "Shooter",
    "rating": 60,
    "coverImage": "https://media.rawg.io/media/games/e9c/e9c042d14515eb3ff7cb4db9fe78e435.jpg",
    "heroImage": "https://media.rawg.io/media/games/e9c/e9c042d14515eb3ff7cb4db9fe78e435.jpg"
  },
  {
    "id": "sho-2",
    "title": "Halo Infinite",
    "developer": "343 Industries",
    "releaseYear": 2021,
    "genre": "Shooter",
    "rating": 87,
    "coverImage": "https://media.rawg.io/media/games/e1f/e1ffbeb1bac25b19749ad285ca29e158.jpg",
    "heroImage": "https://media.rawg.io/media/games/e1f/e1ffbeb1bac25b19749ad285ca29e158.jpg"
  },
  {
    "id": "sho-3",
    "title": "Destiny 2",
    "developer": "Bungie",
    "releaseYear": 2017,
    "genre": "Shooter",
    "rating": 85,
    "coverImage": "https://media.rawg.io/media/games/34b/34b1f1850a1c06fd971bc6ab3ac0ce0e.jpg",
    "heroImage": "https://media.rawg.io/media/games/34b/34b1f1850a1c06fd971bc6ab3ac0ce0e.jpg"
  },
  {
    "id": "sho-4",
    "title": "Overwatch 2",
    "developer": "Blizzard",
    "releaseYear": 2022,
    "genre": "Shooter",
    "rating": 79,
    "coverImage": "https://media.rawg.io/media/games/95a/95a10817d1fc648cff1153f3fa8ef6c5.jpg",
    "heroImage": "https://media.rawg.io/media/games/95a/95a10817d1fc648cff1153f3fa8ef6c5.jpg"
  },
  {
    "id": "sho-5",
    "title": "Apex Legends",
    "developer": "Respawn",
    "releaseYear": 2019,
    "genre": "Shooter",
    "rating": 88,
    "coverImage": "https://media.rawg.io/media/games/737/737ea5662211d2e0bbd6f5989189e4f1.jpg",
    "heroImage": "https://media.rawg.io/media/games/737/737ea5662211d2e0bbd6f5989189e4f1.jpg"
  },
  {
    "id": "sho-6",
    "title": "Valorant",
    "developer": "Riot Games",
    "releaseYear": 2020,
    "genre": "Shooter",
    "rating": 80,
    "coverImage": "https://media.rawg.io/media/games/b11/b11127b9ee3c3701bd15b9af3286d20e.jpg",
    "heroImage": "https://media.rawg.io/media/games/b11/b11127b9ee3c3701bd15b9af3286d20e.jpg"
  },
  {
    "id": "sho-7",
    "title": "Counter-Strike 2",
    "developer": "Valve",
    "releaseYear": 2023,
    "genre": "Shooter",
    "rating": 82,
    "coverImage": "https://media.rawg.io/media/games/ec4/ec4b02bdb3eb5c6212992c19bc05697e.jpg",
    "heroImage": "https://media.rawg.io/media/games/ec4/ec4b02bdb3eb5c6212992c19bc05697e.jpg"
  },
  {
    "id": "sho-8",
    "title": "DOOM Eternal",
    "developer": "id Software",
    "releaseYear": 2020,
    "genre": "Shooter",
    "rating": 88,
    "coverImage": "https://media.rawg.io/media/games/3ea/3ea3c9bbd940b6cb7f2139e42d3d443f.jpg",
    "heroImage": "https://media.rawg.io/media/games/3ea/3ea3c9bbd940b6cb7f2139e42d3d443f.jpg"
  },
  {
    "id": "sho-9",
    "title": "Wolfenstein II: The New Colossus",
    "developer": "MachineGames",
    "releaseYear": 2017,
    "genre": "Shooter",
    "rating": 87,
    "coverImage": "https://media.rawg.io/media/games/a0e/a0ef08621301a1eab5e04fa5c96978fa.jpeg",
    "heroImage": "https://media.rawg.io/media/games/a0e/a0ef08621301a1eab5e04fa5c96978fa.jpeg"
  },
  {
    "id": "sho-10",
    "title": "Titanfall 2",
    "developer": "Respawn",
    "releaseYear": 2016,
    "genre": "Shooter",
    "rating": 89,
    "coverImage": "https://media.rawg.io/media/games/569/56978b5a77f13aa2ec5d09ec81d01cad.jpg",
    "heroImage": "https://media.rawg.io/media/games/569/56978b5a77f13aa2ec5d09ec81d01cad.jpg"
  },
  {
    "id": "spo-1",
    "title": "EA Sports FC 24",
    "developer": "EA Sports",
    "releaseYear": 2023,
    "genre": "Sports",
    "rating": 77,
    "coverImage": "https://media.rawg.io/media/games/104/10404407d458d90f4559a1f587c2650a.jpg",
    "heroImage": "https://media.rawg.io/media/games/104/10404407d458d90f4559a1f587c2650a.jpg"
  },
  {
    "id": "spo-2",
    "title": "NBA 2K24",
    "developer": "Visual Concepts",
    "releaseYear": 2023,
    "genre": "Sports",
    "rating": 68,
    "coverImage": "https://media.rawg.io/media/screenshots/737/7370fe02c248bc0295f187632619af32.jpg",
    "heroImage": "https://media.rawg.io/media/screenshots/737/7370fe02c248bc0295f187632619af32.jpg"
  },
  {
    "id": "spo-3",
    "title": "Madden NFL 24",
    "developer": "EA Tiburon",
    "releaseYear": 2023,
    "genre": "Sports",
    "rating": 65,
    "coverImage": "https://media.rawg.io/media/games/5ec/5ecee9f44d6736412b15f0b01b0619a9.jpg",
    "heroImage": "https://media.rawg.io/media/games/5ec/5ecee9f44d6736412b15f0b01b0619a9.jpg"
  },
  {
    "id": "spo-4",
    "title": "MLB The Show 24",
    "developer": "San Diego Studio",
    "releaseYear": 2024,
    "genre": "Sports",
    "rating": 82,
    "coverImage": "https://media.rawg.io/media/screenshots/e19/e19bb1947c1cb1491b8de8d72eb164f8.jpg",
    "heroImage": "https://media.rawg.io/media/screenshots/e19/e19bb1947c1cb1491b8de8d72eb164f8.jpg"
  },
  {
    "id": "spo-5",
    "title": "F1 23",
    "developer": "Codemasters",
    "releaseYear": 2023,
    "genre": "Sports",
    "rating": 84,
    "coverImage": "https://media.rawg.io/media/games/ef7/ef7cf3546df79efc52d99401afb36e7b.jpg",
    "heroImage": "https://media.rawg.io/media/games/ef7/ef7cf3546df79efc52d99401afb36e7b.jpg"
  },
  {
    "id": "spo-6",
    "title": "Gran Turismo 7",
    "developer": "Polyphony Digital",
    "releaseYear": 2022,
    "genre": "Sports",
    "rating": 87,
    "coverImage": "https://media.rawg.io/media/games/3f6/3f6a04b856f23310d3c2f5be8c5963f7.jpg",
    "heroImage": "https://media.rawg.io/media/games/3f6/3f6a04b856f23310d3c2f5be8c5963f7.jpg"
  },
  {
    "id": "spo-7",
    "title": "Forza Motorsport",
    "developer": "Turn 10",
    "releaseYear": 2023,
    "genre": "Sports",
    "rating": 84,
    "coverImage": "https://media.rawg.io/media/games/e9e/e9ecc560712ebfa6761e45d2523b0fb9.jpg",
    "heroImage": "https://media.rawg.io/media/games/e9e/e9ecc560712ebfa6761e45d2523b0fb9.jpg"
  },
  {
    "id": "spo-8",
    "title": "Rocket League",
    "developer": "Psyonix",
    "releaseYear": 2015,
    "genre": "Sports",
    "rating": 85,
    "coverImage": "https://media.rawg.io/media/games/8cc/8cce7c0e99dcc43d66c8efd42f9d03e3.jpg",
    "heroImage": "https://media.rawg.io/media/games/8cc/8cce7c0e99dcc43d66c8efd42f9d03e3.jpg"
  },
  {
    "id": "spo-9",
    "title": "PGA Tour 2K23",
    "developer": "HB Studios",
    "releaseYear": 2022,
    "genre": "Sports",
    "rating": 76,
    "coverImage": "https://media.rawg.io/media/screenshots/e3f/e3f2052b2e5cd51e9a9d1e27dd40b283.jpg",
    "heroImage": "https://media.rawg.io/media/screenshots/e3f/e3f2052b2e5cd51e9a9d1e27dd40b283.jpg"
  },
  {
    "id": "spo-10",
    "title": "Tony Hawk's Pro Skater 1+2",
    "developer": "Vicarious Visions",
    "releaseYear": 2020,
    "genre": "Sports",
    "rating": 89,
    "coverImage": "https://media.rawg.io/media/games/088/0885c48293746aad6df30735f30d0836.jpg",
    "heroImage": "https://media.rawg.io/media/games/088/0885c48293746aad6df30735f30d0836.jpg"
  },
  {
    "id": "puz-1",
    "title": "Portal 2",
    "developer": "Valve",
    "releaseYear": 2011,
    "genre": "Puzzle",
    "rating": 95,
    "coverImage": "https://media.rawg.io/media/games/2ba/2bac0e87cf45e5b508f227d281c9252a.jpg",
    "heroImage": "https://media.rawg.io/media/games/2ba/2bac0e87cf45e5b508f227d281c9252a.jpg"
  },
  {
    "id": "puz-2",
    "title": "The Witness",
    "developer": "Thekla",
    "releaseYear": 2016,
    "genre": "Puzzle",
    "rating": 87,
    "coverImage": "https://media.rawg.io/media/games/00b/00b164224ebaf381104d0b215a37afb3.jpg",
    "heroImage": "https://media.rawg.io/media/games/00b/00b164224ebaf381104d0b215a37afb3.jpg"
  },
  {
    "id": "puz-3",
    "title": "Tetris Effect: Connected",
    "developer": "Monstars",
    "releaseYear": 2020,
    "genre": "Puzzle",
    "rating": 89,
    "coverImage": "https://media.rawg.io/media/games/377/3770f2c7020bcb6cc2072f073f27fb4c.jpg",
    "heroImage": "https://media.rawg.io/media/games/377/3770f2c7020bcb6cc2072f073f27fb4c.jpg"
  },
  {
    "id": "puz-4",
    "title": "Baba Is You",
    "developer": "Hempuli",
    "releaseYear": 2019,
    "genre": "Puzzle",
    "rating": 87,
    "coverImage": "https://media.rawg.io/media/games/0bc/0bca854021e14ffa9005a85c4567d25c.jpg",
    "heroImage": "https://media.rawg.io/media/games/0bc/0bca854021e14ffa9005a85c4567d25c.jpg"
  },
  {
    "id": "puz-5",
    "title": "Cocoon",
    "developer": "Geometric Interactive",
    "releaseYear": 2023,
    "genre": "Puzzle",
    "rating": 88,
    "coverImage": "https://media.rawg.io/media/games/153/153e8d78ac19e959214dadefb8c27310.jpg",
    "heroImage": "https://media.rawg.io/media/games/153/153e8d78ac19e959214dadefb8c27310.jpg"
  },
  {
    "id": "puz-6",
    "title": "The Talos Principle 2",
    "developer": "Croteam",
    "releaseYear": 2023,
    "genre": "Puzzle",
    "rating": 86,
    "coverImage": "https://media.rawg.io/media/games/4e4/4e42fc297c028630262a4abcc7769576.jpg",
    "heroImage": "https://media.rawg.io/media/games/4e4/4e42fc297c028630262a4abcc7769576.jpg"
  },
  {
    "id": "puz-7",
    "title": "Viewfinder",
    "developer": "Sad Owl Studios",
    "releaseYear": 2023,
    "genre": "Puzzle",
    "rating": 84,
    "coverImage": "https://media.rawg.io/media/games/bee/beeefcd4af46510aec135d098d03bf72.jpg",
    "heroImage": "https://media.rawg.io/media/games/bee/beeefcd4af46510aec135d098d03bf72.jpg"
  },
  {
    "id": "puz-8",
    "title": "Tunic",
    "developer": "Andrew Shouldice",
    "releaseYear": 2022,
    "genre": "Puzzle",
    "rating": 86,
    "coverImage": "https://media.rawg.io/media/games/2c1/2c1984e128ac48b89953ed4de4904a3b.jpg",
    "heroImage": "https://media.rawg.io/media/games/2c1/2c1984e128ac48b89953ed4de4904a3b.jpg"
  },
  {
    "id": "puz-9",
    "title": "Humanity",
    "developer": "tha ltd.",
    "releaseYear": 2023,
    "genre": "Puzzle",
    "rating": 82,
    "coverImage": "https://media.rawg.io/media/games/0eb/0ebd25306a59a3ec8a2cd429298ec572.jpg",
    "heroImage": "https://media.rawg.io/media/games/0eb/0ebd25306a59a3ec8a2cd429298ec572.jpg"
  },
  {
    "id": "puz-10",
    "title": "Unpacking",
    "developer": "Witch Beam",
    "releaseYear": 2021,
    "genre": "Puzzle",
    "rating": 83,
    "coverImage": "https://media.rawg.io/media/games/c11/c1118fbcfd846c631ecb7646f8efc780.jpg",
    "heroImage": "https://media.rawg.io/media/games/c11/c1118fbcfd846c631ecb7646f8efc780.jpg"
  },
  {
    "id": "mob-1",
    "title": "Genshin Impact",
    "developer": "miHoYo",
    "releaseYear": 2020,
    "genre": "Mobile",
    "rating": 84,
    "coverImage": "https://media.rawg.io/media/games/c38/c38bdb5da139005777176d33c463d70f.jpg",
    "heroImage": "https://media.rawg.io/media/games/c38/c38bdb5da139005777176d33c463d70f.jpg"
  },
  {
    "id": "mob-2",
    "title": "PUBG Mobile",
    "developer": "Krafton",
    "releaseYear": 2018,
    "genre": "Mobile",
    "rating": 82,
    "coverImage": "https://media.rawg.io/media/screenshots/087/0879f4aab10a12ecde452f6326bac01e.jpg",
    "heroImage": "https://media.rawg.io/media/screenshots/087/0879f4aab10a12ecde452f6326bac01e.jpg"
  },
  {
    "id": "mob-3",
    "title": "Honor of Kings",
    "developer": "TiMi Studio",
    "releaseYear": 2015,
    "genre": "Mobile",
    "rating": 80,
    "coverImage": "https://media.rawg.io/media/screenshots/f9d/f9d6bbb80ffa345ac0151e7643e32024_20nf0bv.jpg",
    "heroImage": "https://media.rawg.io/media/screenshots/f9d/f9d6bbb80ffa345ac0151e7643e32024_20nf0bv.jpg"
  },
  {
    "id": "mob-4",
    "title": "Marvel Snap",
    "developer": "Second Dinner",
    "releaseYear": 2022,
    "genre": "Mobile",
    "rating": 85,
    "coverImage": "https://media.rawg.io/media/games/1f7/1f73ddf4231f9296d73358ddd5d54e29.jpg",
    "heroImage": "https://media.rawg.io/media/games/1f7/1f73ddf4231f9296d73358ddd5d54e29.jpg"
  },
  {
    "id": "mob-5",
    "title": "Clash Royale",
    "developer": "Supercell",
    "releaseYear": 2016,
    "genre": "Mobile",
    "rating": 86,
    "coverImage": "https://media.rawg.io/media/games/a11/a11912ae667ce96c98619f018ead97ae.jpg",
    "heroImage": "https://media.rawg.io/media/games/a11/a11912ae667ce96c98619f018ead97ae.jpg"
  },
  {
    "id": "mob-6",
    "title": "Pokémon GO",
    "developer": "Niantic",
    "releaseYear": 2016,
    "genre": "Mobile",
    "rating": 71,
    "coverImage": "https://media.rawg.io/media/screenshots/97a/97ab26a9d092783e68190dc686916b0b.jpg",
    "heroImage": "https://media.rawg.io/media/screenshots/97a/97ab26a9d092783e68190dc686916b0b.jpg"
  },
  {
    "id": "mob-7",
    "title": "Candy Crush Saga",
    "developer": "King",
    "releaseYear": 2012,
    "genre": "Mobile",
    "rating": 70,
    "coverImage": "https://media.rawg.io/media/screenshots/51d/51dd944987e4efb74b4bfd9cf0999d40.jpg",
    "heroImage": "https://media.rawg.io/media/screenshots/51d/51dd944987e4efb74b4bfd9cf0999d40.jpg"
  },
  {
    "id": "mob-8",
    "title": "Among Us",
    "developer": "Innersloth",
    "releaseYear": 2018,
    "genre": "Mobile",
    "rating": 85,
    "coverImage": "https://media.rawg.io/media/games/e74/e74458058b35e01c1ae3feeb39a3f724.jpg",
    "heroImage": "https://media.rawg.io/media/games/e74/e74458058b35e01c1ae3feeb39a3f724.jpg"
  },
  {
    "id": "mob-9",
    "title": "Roblox",
    "developer": "Roblox Corp",
    "releaseYear": 2006,
    "genre": "Mobile",
    "rating": 75,
    "coverImage": "https://media.rawg.io/media/games/3af/3af386b6e26be6741b711ae6215ef42f.jpg",
    "heroImage": "https://media.rawg.io/media/games/3af/3af386b6e26be6741b711ae6215ef42f.jpg"
  },
  {
    "id": "mob-10",
    "title": "League of Legends: Wild Rift",
    "developer": "Riot Games",
    "releaseYear": 2020,
    "genre": "Mobile",
    "rating": 89,
    "coverImage": "https://media.rawg.io/media/games/3c7/3c773379b9a4161528bf12a2c9346e93.jpg",
    "heroImage": "https://media.rawg.io/media/games/3c7/3c773379b9a4161528bf12a2c9346e93.jpg"
  }
];

export const reviews: Review[] = games.map(game => {
  const screenshots = [
    game.coverImage,
    game.heroImage,
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    game.coverImage,
    game.heroImage,
    game.coverImage
  ];
  
  return {
    id: `rev-${game.id}`,
    gameId: game.id,
    title: `Exploring the depths of ${game.title}`,
    subtitle: `${game.title} represents a significant milestone in the ${game.genre} genre.`,
    content: 'Full long-form narrative content would go here, detailing the mechanics, story, and technical performance.',
    screenshots,
    publishedAt: '2024-01-01',
    readTime: '10 MIN READ',
    author: {
      name: 'Marcus Thorne',
      role: 'Senior Critic',
      avatar: 'https://i.pravatar.cc/100?u=marcus'
    },
    highs: ['Incredible sound design', 'Stunning visuals', 'Refined mechanics'],
    lows: ['Wait times can be long', 'Steep learning curve'],
    verdict: 'A landmark entry that every fan should experience.'
  };
});
