﻿using Modelling.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Modelling.Helpers
{
    public static class ConnectionStringHelper
    {
        public static string GetConnectionString()
        {
            string hostName = Environment.GetEnvironmentVariable(RepositoryConstants.RepositoryHost);
            string database = Environment.GetEnvironmentVariable(RepositoryConstants.RepositoryDatabase);
            string username = Environment.GetEnvironmentVariable(RepositoryConstants.RepositoryDatabaseUserName);
            string password = Environment.GetEnvironmentVariable(RepositoryConstants.RepositoryDatabasePassword);

            return $"server={hostName};database={database};user={username};password={password}";

        }
    }
}
