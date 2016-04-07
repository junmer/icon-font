build: node_modules source.js
	@babel source.js > index.js
	@chmod +x index.js

node_modules: package.json
	@npm install
	@touch node_modules

default: build
