import {
  apply,
  applyTemplates,
  chain,
  externalSchematic,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
  url
} from '@angular-devkit/schematics';
import { strings, normalize } from '@angular-devkit/core';
import { NgxDashboardUIComponentSchema } from './ngx-dashboard-component';
// import * as path from 'path';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  addPackageJsonDependency,
  NodeDependencyType
} from '@schematics/angular/utility/dependencies';
import * as path from 'path';
import * as ts from 'typescript';
import {
  addRouteDeclarationToModule,
  insertImport,
  isImported,
  addImportToModule
} from '@schematics/angular/utility/ast-utils';
import { applyToUpdateRecorder } from '@schematics/angular/utility/change';

export function ngxDashboardUIComponentGenerator(
  options: NgxDashboardUIComponentSchema
): Rule {
  return (_tree: Tree, context: SchematicContext) => {
    context.logger.info(
      'Adding example tempalte and configuring Module Federation to the app in progress.'
    );
    const templateSource = apply(url('./files'), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        name: options.name
      }),
      move(normalize(`/${options.path}/${strings.dasherize(options.name)}`))
    ]);
    return chain([
      externalSchematic('@angular-architects/module-federation', 'ng-add', {
        project: options.project
      }),
      mergeWith(templateSource, MergeStrategy.Overwrite),
      makeAppRouteAsync(options),
      config(options)
    ]);
  };
}

function makeAppRouteAsync(options: NgxDashboardUIComponentSchema): Rule {
  return async function (tree, context) {
    context.logger.info('Adding routing Module to the app...!');
    const workspaceFileName = getWorkspaceFileName(tree);
    const workspace = JSON.parse(
      tree.read(workspaceFileName)!.toString('utf8')
    )!;

    if (!options.project) {
      context.logger.info(
        `default project selected is: => ${workspace.defaultProject}`
      );
      options.project = workspace.defaultProject;
    }

    if (!options.project) {
      throw new Error(
        `No default project found. Please specifiy a project name!`
      );
    }
    const projectName = options.project;

    const projectConfig = workspace.projects[projectName];
    const main = projectConfig.architect.build.options.main;
    const mainPath = path.dirname(main);

    let appRoutingModulePath = path.join(mainPath, 'app/app-routing.module.ts');

    if (!tree.exists(appRoutingModulePath)) {
      const appModulePath = path.join(mainPath, 'app/app.module.ts');
      if (!tree.exists(appModulePath)) {
        console.info(
          `${appRoutingModulePath} not exists in below project path.`
        );
        console.info(
          'Please enable routing in your application and try again.'
        );
        console.info('paths tried => ', [appRoutingModulePath, appModulePath]);
        return;
      } else {
        appRoutingModulePath = appModulePath;
      }
      // console.info(`${appRoutingModulePath} not exists in below project path.`);
      // console.info('path => ', appRoutingModulePath);
      // return;
    }

    const recorder = tree.beginUpdate(appRoutingModulePath);

    const text = tree.read(appRoutingModulePath);

    if (text === null) {
      throw new SchematicsException(
        `The file ${appRoutingModulePath} doesn't exists...`
      );
    }

    //const mainContent = tree.read(main)!;
    //tree.create(appModulePath, mainContent);

    const source = ts.createSourceFile(
      appRoutingModulePath,
      text.toString(),
      ts.ScriptTarget.Latest,
      true
    );

    applyToUpdateRecorder(recorder, [
      addRouteDeclarationToModule(
        source,
        appRoutingModulePath,
        `{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },`
      ),
      addRouteDeclarationToModule(
        source,
        appRoutingModulePath,
        `{
          path: '',
          component: MainLayoutComponent,
          children: [
            {
              path: 'dashboard',
              loadChildren: () =>
                import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
            },
          ],
        }`
      ),
      insertImport(
        source,
        appRoutingModulePath,
        'MainLayoutComponent',
        './dashboard/components/layout/main-layout.component'
      )
    ]);

    const appModulePathForImport = path.join(mainPath, 'app/app.module.ts');
    const recorderForImport = tree.beginUpdate(appModulePathForImport);
    const textForImport = tree.read(appModulePathForImport)!;
    const sourceForImport = ts.createSourceFile(
      appModulePathForImport,
      textForImport.toString(),
      ts.ScriptTarget.Latest,
      true
    );

    const isBrowserAnimationsModuleImporExsist: boolean = isImported(
      sourceForImport,
      'BrowserAnimationsModule',
      appModulePathForImport
    );
    if (!isBrowserAnimationsModuleImporExsist) {
      context.logger.info(
        `BrowserAnimationsModule Import not exists in path=> ${appModulePathForImport}`
      );
      context.logger.info(
        'So adding BrowserAnimationsModule Module to the app...'
      );
      applyToUpdateRecorder(
        recorderForImport,
        addImportToModule(
          sourceForImport,
          appModulePathForImport,
          'BrowserAnimationsModule',
          '@angular/platform-browser/animations'
        )
      );
    }

    const isHttpClientModuleImporExsist: boolean = isImported(
      sourceForImport,
      'HttpClientModule',
      appModulePathForImport
    );
    if (!isHttpClientModuleImporExsist) {
      context.logger.info(
        `HttpClientModule import not exists in path=> ${appModulePathForImport}`
      );
      context.logger.info('So adding HttpClientModule Module to the app...');
      applyToUpdateRecorder(
        recorderForImport,
        addImportToModule(
          sourceForImport,
          appModulePathForImport,
          'HttpClientModule',
          '@angular/common/http'
        )
      );
    }

    tree.commitUpdate(recorder);
    tree.commitUpdate(recorderForImport);
    context.logger.info('Routing Module added succesfully');
  };
}

export default function config(options: NgxDashboardUIComponentSchema): Rule {
  return async function (tree: Tree, context: SchematicContext) {
    context.logger.info('Updating the angular json file with configurations');
    const workspaceFileName = getWorkspaceFileName(tree);
    tree = tree!;
    const workspace = JSON.parse(
      tree.read(workspaceFileName)!.toString('utf8')
    )!;

    options = options!;
    if (!options.project) {
      context.logger.info(
        `default project selected is: => ${workspace.defaultProject}`
      );
      options.project = workspace.defaultProject;
    }

    if (!options.project) {
      throw new Error(
        `No default project found. Please specifiy a project name!`
      );
    }

    const projectName = options.project;
    const projectConfig = workspace.projects[projectName];

    if (!projectConfig) {
      throw new Error(`Project ${projectName} not found!`);
    }

    // const projectRoot: string = projectConfig.root?.replace(/\\/g, '/');
    // const projectSourceRoot: string = projectConfig.sourceRoot?.replace(
    //   /\\/g,
    //   '/'
    // );

    // const main = projectConfig.architect.build.options.main;
    // const relWorkspaceRoot = path.relative(projectRoot, '');

    if (!projectConfig?.architect?.build || !projectConfig?.architect?.serve) {
      throw new Error(
        `The project doen't have a build or serve target in angular.json!`
      );
    }

    if (!projectConfig.architect.build.options) {
      projectConfig.architect.build.options = {};
    }

    if (!projectConfig.architect.serve.options) {
      projectConfig.architect.serve.options = {};
    }

    projectConfig.architect.build.options.assets.push(getAssetConfigValue());
    projectConfig.architect.build.options.styles.push(
      'node_modules/ngx-dashboard-designer/assets/dashboard-designer/dashboard-designer-theme.css'
    );

    tree.overwrite(workspaceFileName, JSON.stringify(workspace, null, '\t'));
    context.logger.info(
      'Successfully updated the angular json file with configurations'
    );

    updatePackageJson(tree, context);
  };
}

export function getWorkspaceFileName(tree: Tree): string {
  if (tree.exists('angular.json')) {
    return 'angular.json';
  }
  if (tree.exists('workspace.json')) {
    return 'workspace.json';
  }
  throw new Error(
    "angular.json or workspace.json expected! Did you call this in your project's root?"
  );
}

interface PackageJson {
  scripts?: { [key: string]: string };
  dependencies?: { [key: string]: string };
  devDependencies?: { [key: string]: string };
}

function updatePackageJson(tree: Tree, context: SchematicContext): void {
  context.logger.info('Updating the package json file with dependencies');
  let packageJson: PackageJson = JSON.parse(
    tree.read('package.json')!.toString('utf-8')
  )!;

  packageJson = packageJson!;
  if (!packageJson.dependencies) {
    packageJson.dependencies = {};
  }

  if (!packageJson.dependencies!['@angular-architects/module-federation']) {
    packageJson.dependencies!['@angular-architects/module-federation'] =
      '^14.3.10';
  }

  if (!packageJson.dependencies!['@angular/cdk']) {
    packageJson.dependencies!['@angular/cdk'] = '^14.0.0';
    addPackageJsonDependency(tree, {
      name: '@angular/cdk',
      type: NodeDependencyType.Default,
      version: '^14.0.0',
      overwrite: true
    });
  }

  if (!packageJson.dependencies!['ngx-bootstrap']) {
    packageJson.dependencies!['ngx-bootstrap'] = '^6.2.0';
    addPackageJsonDependency(tree, {
      name: 'ngx-bootstrap',
      type: NodeDependencyType.Default,
      version: '^6.2.0',
      overwrite: true
    });
  }

  if (!packageJson.dependencies!['rxjs']) {
    packageJson.dependencies!['rxjs'] = '7.5.5';
    addPackageJsonDependency(tree, {
      name: 'rxjs',
      type: NodeDependencyType.Default,
      version: '7.5.5',
      overwrite: true
    });
  }

  if (!packageJson.dependencies!['@angular/forms']) {
    packageJson.dependencies!['@angular/forms'] = '14.0.0';
    addPackageJsonDependency(tree, {
      name: '@angular/forms',
      type: NodeDependencyType.Default,
      version: '14.0.0',
      overwrite: true
    });
  }

  if (!packageJson.dependencies!['ngx-build-plus']) {
    packageJson.devDependencies!['ngx-build-plus'] = '^14.0.0';
    addPackageJsonDependency(tree, {
      name: 'ngx-build-plus',
      type: NodeDependencyType.Dev,
      version: '^14.0.0',
      overwrite: true
    });
  }

  context.logger.info(
    'Successfully updated the package json file with dependencies'
  );

  context.logger.info('Installing npm additional dependencies...');
  context.addTask(new NodePackageInstallTask());
}

function getAssetConfigValue(): any {
  return {
    glob: '**/*',
    input: './node_modules/ngx-dashboard-designer/assets/dashboard-designer/',
    output: './assets/dashboard-designer/'
  };
}
