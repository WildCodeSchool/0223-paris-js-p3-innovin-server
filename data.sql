INSERT INTO mydb.wine (name,color,manufacture_year,`domain`,region,cepage,image) VALUES
	 ('Blanc de Blanc','White','1979','Ruinart','Champagne','Muscat','heyy'),
	 ('Chablis','White','2021','Domaine de Vauroux','Bourgogne','Chardonnay','heyy'),
	 ('La fiole du Pape','Rouge','2004','Maison Brotte','Avignon','Cinsault','Heyyyyyy'),
	 ('Le sang de la vigne','Rouge','1995','Chateau La Louvière','Bordeaux','Pinot noir','image coole'),
	 ('Le larmes de la terre','Blanc','1920','Domaine de la Motte','Alsace','Pinot blanc','image coole encore plus');



INSERT INTO mydb.`user` (firstname,lastname,email,password,age,`role`,comment) VALUES
	 ('Celia','Golden','princess@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$oKINUTSPrDaQKKNBnI3xuA$wz0ebKYpLsWWWYOUuw58jmrXKl7lMmlJGYHhNqZTJMM',21,'ROLE_USER',NULL),
	 ('Saverio','Platinium','mammamia@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$0kcgVUGnvv+FiSkqoWY1fg$3h3mUp4tjJJJmgPL57vjHIlN7wAOJcihSyjHHp4eICg',28,'ROLE_USER',NULL),
	 ('JM','Guirlande','triforce@hyrule.com','$argon2id$v=19$m=65536,t=3,p=4$jFoy3cUueXp0P/8huFOoVw$dN6Zk+sfhZTEPwiB8BiSx4OTAwVYEQ7jYhnfyw95xlU',23,'ROLE_USER',NULL),
	 ('Tom','Nana','adress@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$t67zhRKcXGLqJ3p9KO5f5Q$q4RFIN4d02J76sr6HWh/bXmIjryzO6M7qLvLyxkANn8',23,'ROLE_USER',NULL),
	 ('Thomas','Te','burata@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$8iGCr2Bkx5pnsMzSkG3o8w$elbVXhunIGEVS8XewsCy/SvFce7zDxxbq14fLkMZpo0',28,'ROLE_USER',NULL);


INSERT INTO mydb.`session` (category,`date`,location,price,max_participants) VALUES
	 ('Dégustation','2023-09-19 00:00:00','La Cascade',40,10),
	 ('Création','2023-08-08 00:00:00','La Grotte',70,10);

INSERT INTO mydb.session_has_user (user_id,session_id) VALUES
	 (1,1),
	 (2,1),
	 (5,1),
	 (3,2),
	 (4,2);

INSERT INTO mydb.session_has_wine (wine_id,session_id) VALUES
	 (1,1),
	 (2,1),
	 (3,1),
	 (4,1),
	 (1,2),
	 (2,2),
	 (3,2),
	 (4,2),
     (5,1),
     (5,2);


INSERT INTO mydb.tag (type_of_tag,category,name) VALUES
	 ('User','Bouche','Vieu Bandage'),
	 ('User','Bouche','Charnu'),
	 ('User','Bouche','Fruité'),
	 ('User','Nez','Grillé'),
	 ('User','Nez','Epicé'),
	 ('User','Nez','Acide'),
	 ('User','Oeil','Profond'),
	 ('User','Oeil','Clair'),
	 ('User','Oeil','Intense'),
	 ('Wine','Bouche','Rond'),
	 ('Wine','Bouche','Sucré'),
	 ('Wine','Bouche','Bouchoné'),
	 ('Wine','Nez','Enivrant'),
	 ('Wine','Nez','Terreux'),
	 ('Wine','Nez','Floral'),
	 ('Wine','Oeil','Grenat'),
	 ('Wine','Oeil','Framboise'),
	 ('Wine','Oeil','Rubis'),
	 ('Wine','Oeil','Doré');

INSERT INTO mydb.user_has_tag (user_id,tag_id) VALUES
	 (1,1),
	 (4,1),
	 (1,2),
	 (3,3),
	 (1,4),
	 (2,4),
	 (5,4),
	 (5,5),
	 (2,6),
	 (3,6),
	 (4,7),
	 (5,7),
	 (3,8),
	 (4,8),
	 (2,9);

INSERT INTO mydb.user_has_favorite (user_id,wine_id) VALUES
	 (1,1),
	 (2,1),
	 (3,1),
	 (5,1),
	 (1,2),
	 (3,2),
	 (4,2),
	 (5,2),
	 (1,3),
	 (3,3),
	 (4,3),
	 (5,3),
	 (2,4),
	 (4,4),
	 (5,4),
	 (2,5),
	 (3,5),
	 (5,5);

INSERT INTO mydb.recipe (user_id,session_id,won_contest,selected_for_context) VALUES
	 (1,2,0,1),
	 (2,2,1,1);


INSERT INTO mydb.mix_wine (recipe_id,wine_id,percent_wine) VALUES
	 (1,1,70),
	 (1,2,15),
	 (1,3,15),
	 (2,1,10),
	 (2,4,70),
	 (2,5,20);


INSERT INTO mydb.note (wine_id,user_id,session_id,note) VALUES
	 (1,1,2,10),
	 (2,1,2,9),
	 (3,1,2,8),
	 (4,1,2,5),
	 (5,1,2,7),
	 (1,2,2,5),
	 (2,2,2,1),
	 (3,2,2,3),
	 (4,2,2,10),
	 (5,2,2,4);


INSERT INTO mydb.note_has_tag (note_id,tag_id) VALUES
	 (1,10),
	 (10,10),
	 (1,11),
	 (9,11),
	 (10,11),
	 (2,12),
	 (9,12),
	 (2,13),
	 (8,13),
	 (3,14),
	 (8,14),
	 (3,15),
	 (7,15),
	 (4,16),
	 (7,16),
	 (4,17),
	 (6,17),
	 (5,18),
	 (6,18),
	 (5,19);

