CREATE TABLE user_info
(
  id integer NOT NULL DEFAULT SERIAL,
  name character varying(100) COLLATE pg_catalog."default" NOT NULL,
  email character varying(50) COLLATE pg_catalog."default" NOT NULL,
  age integer NOT NULL,
  phone character varying(15) COLLATE pg_catalog."default" NOT NULL,
  CONSTRAINT user_pkey PRIMARY KEY (id)
)


CREATE TABLE book
(
  id integer NOT NULL DEFAULT SERIAL,
  title character varying(50) COLLATE pg_catalog."default",
  year integer,
  author_id integer,
  CONSTRAINT books_pkey PRIMARY KEY (id),
  CONSTRAINT books_author_id_fkey FOREIGN KEY (author_id)
    REFERENCES public.user_info (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
)