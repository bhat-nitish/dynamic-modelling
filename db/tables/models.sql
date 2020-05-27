create table models(
		id int auto_increment,
        name varchar(512) not null,
        base_model_id int not null,
        model_type varchar(512) not null,
        model_config  json not null,
        segment_id int not null,
        parent_id int not null,
        primary key(id),
		created_by varchar(500) not null,
	    created_on datetime not null,
	    last_updated_on datetime not null,
	    last_updated_by varchar(512) not null,
	    foreign key (base_model_id) references model_repo(id)
);
