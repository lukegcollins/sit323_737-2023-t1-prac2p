PGDMP     7                    {           sit734_prac02    15.1    15.1     ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                        1262    17038    sit734_prac02    DATABASE     ?   CREATE DATABASE sit734_prac02 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Australia.1252';
    DROP DATABASE sit734_prac02;
                postgres    false            ?            1259    17050    contact    TABLE     $  CREATE TABLE public.contact (
    id integer NOT NULL,
    name text,
    email text,
    phone text,
    CONSTRAINT check_email CHECK ((char_length(name) <= 255)),
    CONSTRAINT check_name CHECK ((char_length(name) <= 255)),
    CONSTRAINT check_phone CHECK ((char_length(name) <= 255))
);
    DROP TABLE public.contact;
       public         heap    postgres    false            ?            1259    17049    contact_contact_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.contact_contact_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.contact_contact_id_seq;
       public          postgres    false    215                       0    0    contact_contact_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.contact_contact_id_seq OWNED BY public.contact.id;
          public          postgres    false    214            e           2604    17053 
   contact id    DEFAULT     p   ALTER TABLE ONLY public.contact ALTER COLUMN id SET DEFAULT nextval('public.contact_contact_id_seq'::regclass);
 9   ALTER TABLE public.contact ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215            ?          0    17050    contact 
   TABLE DATA           9   COPY public.contact (id, name, email, phone) FROM stdin;
    public          postgres    false    215   i                  0    0    contact_contact_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.contact_contact_id_seq', 8, true);
          public          postgres    false    214            j           2606    17060    contact contact_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.contact
    ADD CONSTRAINT contact_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.contact DROP CONSTRAINT contact_pkey;
       public            postgres    false    215            ?   d   x?3?.?LI-?M??,?+H,?N-rH?H?-?I?K???4?00060040?2?tJ,)L?+O??K?PgV?e???W??TX???????????̌+F??? 1?%?     