create table Playground.cards(
  card_id VARCHAR(6) UNIQUE NOT NULL,
  card_name VARCHAR(10),
  make_at TIMESTAMP NOT NULL
);
insert cards(card_id, card_name)
values('a9ksi3', 'king');
insert cards(card_id, card_name)
values('ksid9f', 'queen');
