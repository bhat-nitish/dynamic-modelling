using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Modelling.Entities
{
    public class ModelTypes
    {
        public const string OneStep = "o";
        public const string NStep = "n";
        public const string Ensemble = "e";
    }

    public class RepositoryConstants
    {
        public const string RepositoryHost = "modelling_repo_host";
        public const string RepositoryDatabase = "modelling_repo_database";
        public const string RepositoryDatabaseUserName = "modelling_repo_username";
        public const string RepositoryDatabasePassword = "modelling_repo_password";
    }
}
