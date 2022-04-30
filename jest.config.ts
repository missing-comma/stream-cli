// jest.config.ts
import { Config } from '@jest/types';
type JestConfig = Config.InitialOptions;

type TestScope = 'unit' | 'integration' | 'staged' | 'ci';
const testScope: TestScope = (process.env.TEST_SCOPE as any) || '';

const scopeSpecificConfigurations: Record<TestScope, (conf: JestConfig) => JestConfig> = {
	unit: (conf) => ({
		...conf,
		testMatch: ['**/*.spec.ts'],
	}),
	integration: (conf) => ({
		...conf,
		testMatch: ['**/*.test.ts'],
	}),
	staged: (conf) => {
		conf.findRelatedTests = true;
		return conf;
	},
	ci: (conf) => {
		return conf;
	},
};

const config: JestConfig = {
	preset: 'ts-jest',
	collectCoverageFrom: [
		'<rootDir>/src/**/*.ts',
		'!<rootDir>/src/domain/**',
		'!<rootDir>/src/**/types.ts',
		'!<rootDir>/src/**/index.ts',
		'!**/protocols/**',
		'!**/test/**',
	],
	coverageDirectory: 'coverage',
	coverageReporters: ['json-summary', 'json', 'lcov', 'text', 'clover'],
	coverageProvider: 'babel',
	testEnvironment: 'node',
	transform: {
		'.+\\.ts$': 'ts-jest',
	},
	testMatch: ['**/*.(spec|test).ts'],
	moduleNameMapper: {
		'~/(.*)': '<rootDir>/src/$1',
	},
	clearMocks: true,
};

if (testScope) {
	const testScopeCapitalized = `${testScope.charAt(0).toUpperCase()}${testScope.slice(1)}`;
	console.log(`Running ${testScopeCapitalized} Tests`);
	const configMutator = scopeSpecificConfigurations[testScope];
	Object.assign(config, configMutator(config));
}
export default config;
