import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

function App() {
  const [repos, setRepos] = useState([]);
  const [profile, setProfile] = useState(null);
  const [readmes, setReadmes] = useState({});

  useEffect(() => {
    fetch('https://api.github.com/users/soydex')
      .then(res => res.json())
      .then(data => setProfile(data));

    fetch('https://api.github.com/users/soydex/repos')
      .then(res => res.json())
      .then(async (data) => {
        setRepos(data);
        for (const repo of data) {
          try {
            const readmeRes = await fetch(`https://raw.githubusercontent.com/soydex/${repo.name}/main/README.md`);
            const readmeText = await readmeRes.text();
            setReadmes(prev => ({...prev, [repo.name]: readmeText}));
          } catch {
            console.log(`Pas de README pour ${repo.name}`);
          }
        }
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gray-800/80 backdrop-blur-sm"
      >
        {profile && (
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
            <motion.img
              whileHover={{ scale: 1.1 }}
              src={profile.avatar_url}
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h1 className="text-xl font-bold">{profile.name || 'Soydex'}</h1>
              <div className="flex gap-4 text-sm text-gray-400">
                <span>{profile.followers} followers</span>
                <span>{profile.following} following</span>
                <span>{profile.public_repos} repos</span>
              </div>
            </div>
          </div>
        )}
      </motion.header>

      <div className="pt-24 pb-12">
        {repos.map((repo, index) => (
          <motion.section
            key={repo.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className={`min-h-screen flex flex-col md:flex-row items-start gap-8 max-w-6xl mx-auto px-4 py-24 ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            <motion.div
              initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2"
            >
              <h2 className="text-3xl font-bold text-indigo-400 mb-4">{repo.name}</h2>
              <p className="text-gray-300 mb-6">{repo.description || 'No description available'}</p>
              <div className="flex gap-4 text-sm text-gray-400 mb-6">
                <span>⭐ {repo.stargazers_count}</span>
                <span>🔄 {repo.forks_count}</span>
              </div>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                View Repository
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ x: index % 2 === 0 ? 100 : -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2 bg-gray-800/50 rounded-lg p-6"
            >
              <div className="prose prose-invert prose-sm max-h-48 overflow-hidden relative">
                {readmes[repo.name] ? (
                  <>
                    <ReactMarkdown>{readmes[repo.name]}</ReactMarkdown>
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-800/50 to-transparent"></div>
                  </>
                ) : (
                  <p className="text-gray-400">No README available</p>
                )}
              </div>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`https://github.com/soydex/${repo.name}#readme`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block px-4 py-2 bg-gray-700 text-sm rounded-lg hover:bg-gray-600 transition-colors"
              >
                Voir le README complet →
              </motion.a>
            </motion.div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}

export default App;
