insert into model_parameters(model_id,parameter_name ,display_name ,min_value ,max_value ,default_value ,type ,description) values (1,'maxDepth','Maximum Depth','0','30','15','Numeric','Maximum depth of the tree. (>= 0) E.g., depth 0 means 1 leaf node; depth 1 means 1 internal node + 2 leaf nodes');
insert into model_parameters(model_id,parameter_name ,display_name ,min_value ,max_value ,default_value ,type ,description) values (1,'maxBins','Number Of Bins','2','','10','Numeric','Max number of bins for discretizing continuous features. Must be >=2 and >= number of categories for any categorical feature');
insert into model_parameters(model_id,parameter_name ,display_name ,min_value ,max_value ,default_value ,type ,description) values (1,'HyperParameter_Ind','HyperParameter Tuning','','','','Boolean','Hyperparameter
optimization or tuning
is the problem of
choosing a set of
optimal
hyperparameters for a
learning algorithm');

insert into model_parameters(model_id,parameter_name ,display_name ,min_value ,max_value ,default_value ,type ,description) values (2,'maxDepth','Maximum Depth','','','','Numeric','Maximum depth of the tree. (>= 0) E.g., depth 0 means 1 leaf node; depth 1 means 1 internal node + 2 leaf nodes');
insert into model_parameters(model_id,parameter_name ,display_name ,min_value ,max_value ,default_value ,type ,description) values (2,'maxBins','Number Of Bins','','','','Numeric','Max number of bins for discretizing continuous features. Must be >=2 and >= number of categories for any categorical feature');
insert into model_parameters(model_id,parameter_name ,display_name ,min_value ,max_value ,default_value ,type ,description) values (2,'HyperParameter_Ind','HyperParameter Tuning','','','','Boolean','Hyperparameter
optimization or tuning
is the problem of
choosing a set of
optimal
hyperparameters for a
learning algorithm');

insert into model_parameters(model_id,parameter_name ,display_name ,min_value ,max_value ,default_value ,type ,description) values (3,'maxIter','Maximum Iterations','0','','200','Numeric','Maximum number of Iterations');
insert into model_parameters(model_id,parameter_name ,display_name ,min_value ,max_value ,default_value ,type ,description) values (3,'maxDepth','Maximum Depth','0','30','15','Numeric','Maximum depth of the tree. (>= 0) E.g., depth 0 means 1 leaf node; depth 1 means 1 internal node + 2 leaf nodes');
insert into model_parameters(model_id,parameter_name ,display_name ,min_value ,max_value ,default_value ,type ,description) values (3,'maxBins','Number Of Bins','2','','10','Numeric','Max number of bins for
discretizing continuous
features. Must be >=2
and >= number of
categories for any
categorical feature');
insert into model_parameters(model_id,parameter_name ,display_name ,min_value ,max_value ,default_value ,type ,description) values (3,'stepSize','Step Size','0.0000001','1','','Float','Learning rate in interval
(0, 1) for shrinking the
contribution of each
estimator');
insert into model_parameters(model_id,parameter_name ,display_name ,min_value ,max_value ,default_value ,type ,description) values (3,'HyperParameter_Ind','HyperParameter Tuning','','','','Boolean','Hyperparameter
optimization or tuning
is the problem of
choosing a set of
optimal
hyperparameters for a
learning algorithm');

insert into model_parameters(model_id,parameter_name ,display_name ,min_value ,max_value ,default_value ,type ,description) values (4,'maxIter','Maximum Iterations','','','','Numeric','Maximum number of Iterations');
insert into model_parameters(model_id,parameter_name ,display_name ,min_value ,max_value ,default_value ,type ,description) values (4,'regParam','Regularization Parameter','','','','Float','Regularization Parameter');
insert into model_parameters(model_id,parameter_name ,display_name ,min_value ,max_value ,default_value ,type ,description) values (4,'aggregationDepth','Aggregation Depth','','','','Numeric','Suggested depth for treeAggregate (>=2)');
insert into model_parameters(model_id,parameter_name ,display_name ,min_value ,max_value ,default_value ,type ,description) values (4,'HyperParameter_Ind','HyperParameter Tuning','','','','Boolean','Hyperparameter
optimization or tuning
is the problem of
choosing a set of
optimal
hyperparameters for a
learning algorithm');

insert into model_parameters(model_id,parameter_name ,display_name ,min_value ,max_value ,default_value ,type ,description) values (5,'maxIter','Maximum Iterations','0','','10000','Numeric','Maximum number of Iterations');
insert into model_parameters(model_id,parameter_name ,display_name ,min_value ,max_value ,default_value ,type ,description) values (5,'regParam','Regularization Parameter','0','','10','Float','Regularization Parameter');
insert into model_parameters(model_id,parameter_name ,display_name ,min_value ,max_value ,default_value ,type ,description) values (5,'elasticNetParam','Maximum Iterations','','','','Numeric','Maximum number of Iterations');
insert into model_parameters(model_id,parameter_name ,display_name ,min_value ,max_value ,default_value ,type ,description) values (5,'maxIter','ElasticNet Mixing Parameter','0','1','0.5','Float','ElasticNet mixing
parameter, in range [0,
1]. For alpha = 0, the
penalty is an L2
penalty(Ridge). For
alpha = 1, it is an
L1(Lasso) penalty');
insert into model_parameters(model_id,parameter_name ,display_name ,min_value ,max_value ,default_value ,type ,description) values (5,'HyperParameter_Ind','HyperParameter Tuning','','','','Boolean','Hyperparameter
optimization or tuning
is the problem of
choosing a set of
optimal
hyperparameters for a
learning algorithm');


insert into model_parameters(model_id,parameter_name ,display_name ,min_value ,max_value ,default_value ,type ,description) values (6,'maxIter','Maximum Iterations','0','','','Numeric','Maximum number of Iterations');
insert into model_parameters(model_id,parameter_name ,display_name ,min_value ,max_value ,default_value ,type ,description) values (6,'stepSize','Step Size','0','1','','Float','Learning rate in interval (0, 1) for shrinking the contribution of each estimator');
insert into model_parameters(model_id,parameter_name ,display_name ,min_value ,max_value ,default_value ,type ,description) values (6,'layers','Layers','','','','List','Sizes of layers from
input layer to output
layer E.g., Array(10, 10,
2) means 10 inputs,
one hidden layer with
10 neurons and output
layer of 2 neurons');
insert into model_parameters(model_id,parameter_name ,display_name ,min_value ,max_value ,default_value ,type ,description) values (6,'HyperParameter_Ind','HyperParameter Tuning','','','','Boolean','Hyperparameter
optimization or tuning
is the problem of
choosing a set of
optimal
hyperparameters for a
learning algorithm');


insert into model_parameters(model_id,parameter_name ,display_name ,min_value ,max_value ,default_value ,type ,description) values (7,'numTrees','Maximum Iterations','1','','200','Numeric','Number of Trees to train');
insert into model_parameters(model_id,parameter_name ,display_name ,min_value ,max_value ,default_value ,type ,description) values (7,'maxDepth','Maximum Iterations','0','30','15','Numeric','Maximum depth of the tree. (>= 0) E.g., depth
0 means 1 leaf node;
depth 1 means 1
internal node + 2 leaf
nodes');
insert into model_parameters(model_id,parameter_name ,display_name ,min_value ,max_value ,default_value ,type ,description) values (7,'maxBins','Maximum Iterations','2','','10','Numeric','Max number of bins for
discretizing continuous
features. Must be >=2
and >= number of
categories for any
categorical feature');
insert into model_parameters(model_id,parameter_name ,display_name ,min_value ,max_value ,default_value ,type ,description) values (7,'HyperParameter_Ind','HyperParameter Tuning','','','','Boolean','Hyperparameter
optimization or tuning
is the problem of
choosing a set of
optimal
hyperparameters for a
learning algorithm');

insert into model_parameters(model_id,parameter_name ,display_name ,min_value ,max_value ,default_value ,type ,description) values (8,'numTrees','Maximum Iterations','','','','Numeric','Number of Trees to train');
insert into model_parameters(model_id,parameter_name ,display_name ,min_value ,max_value ,default_value ,type ,description) values (8,'maxDepth','Maximum Iterations','','','','Numeric','Maximum depth of the tree. (>= 0) E.g., depth
0 means 1 leaf node;
depth 1 means 1
internal node + 2 leaf
nodes');
insert into model_parameters(model_id,parameter_name ,display_name ,min_value ,max_value ,default_value ,type ,description) values (8,'maxBins','Maximum Iterations','','','','Numeric','Max number of bins for
discretizing continuous
features. Must be >=2
and >= number of
categories for any
categorical feature');
insert into model_parameters(model_id,parameter_name ,display_name ,min_value ,max_value ,default_value ,type ,description) values (8,'HyperParameter_Ind','HyperParameter Tuning','','','','Boolean','Hyperparameter
optimization or tuning
is the problem of
choosing a set of
optimal
hyperparameters for a
learning algorithm');

insert into model_parameters(model_id,parameter_name ,display_name ,min_value ,max_value ,default_value ,type ,description) values (9,'numTrees','Maximum Iterations','0','','10000','Numeric','Number of Trees to train');
insert into model_parameters(model_id,parameter_name ,display_name ,min_value ,max_value ,default_value ,type ,description) values (9,'regParam','Regularization Parameter','0','','10','Float','Regularization Parameter');
insert into model_parameters(model_id,parameter_name ,display_name ,min_value ,max_value ,default_value ,type ,description) values (9,'HyperParameter_Ind','HyperParameter Tuning','','','','Boolean','Hyperparameter
optimization or tuning
is the problem of
choosing a set of
optimal
hyperparameters for a
learning algorithm');

