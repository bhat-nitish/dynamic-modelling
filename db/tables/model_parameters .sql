create table model_parameters (
						id int auto_increment,
                        model_id int not null,
						parameter_name varchar(512)  not null,
                        display_name varchar(512) not null,
                        min_value varchar(256) not null,
                        max_value varchar(256) not null,
                        default_value varchar(256) not null,
                        type varchar(256) not null,
                        description varchar(2000) not null,
                        primary key (id),
                        foreign key (model_id) references model_repo(id)
					)
