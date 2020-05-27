create table model_repo(id int auto_increment,
                model_type varchar(512) not null,
                function_name varchar(512) not null ,
                path varchar(1000) not null,
                y_var_type varchar(100) not null,
                display_name varchar(512) not null,
                insert_date  datetime not null,
                last_updated_on datetime not null,
                primary key(id))
