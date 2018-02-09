/**
 * @author <contact@dannycoulombe.com>
 */
(function() {
	
	/**
	 * Workspace sidebar
	 */
	Zemit.app.directive('zmSidebarWorkspace', ['$zm', '$history', '$session', '$modal', '$workspace', '$util', '$i18n', function($zm, $history, $session, $modal, $workspace, $util, $i18n) {
		return {
			restrict: 'E',
			replace: true,
			scope: true,
			templateUrl: 'core/components/sidebar/workspace/workspace.html',
			link: async function ($s, $e, attrs) {
				
				var workspaces = await $workspace.getAll();
				
				var data = [];
				var settings = $session.get('settings');
				var filters = {
					query: ''
				};
				var stats = {
					countNodes: function(node, parent, depth) {
						return $s.treeviewOptions.levels[0].getList(node).length;
					}
				};
				
				var prepareSettings = () => {
					
					var tabsConfigs = {};
					angular.forEach(workspaces, function(workspace, key) {
						tabsConfigs[workspace.getKey()] = {
							visible: key === 0 ? true : false
						};
					});
					
					$session.prepare('settings', {
						sidebar: {
							workspace: {
								tabs: tabsConfigs
							}
						}
					});
				};
				prepareSettings();
				
				$s.treeviewOptions = {
					scope: $s,
					levels: [{
						///////////////////////////////
						// WORKSPACE
						///////////////////////////////
						canAdd: true,
						addLabel: $i18n.get('core.components.sidebar.workspace.addProjectLabel'),
						emptyLabel: $i18n.get('core.components.sidebar.workspace.emptyProjectLabel'),
						onEdit: (model, parent, depth) => {
							$s.connect(model);
						},
						onAdd: (model, parent, depth) => {
							$s.editProject(model);
						},
						onRemove: (model, parent, depth) => {
							
							$modal.dialog('workspace_remove', {
								backdrop: true,
								title: $i18n.get('core.components.sidebar.workspace.removeWorkspaceModalTitle'),
								content: $i18n.get('core.components.sidebar.workspace.removeWorkspaceModalContent', {
									workspace: model.getName()
								}),
								buttons: {
									remove: {
										label: $i18n.get('core.components.sidebar.workspace.removeWorkspaceModalBtnRemove'),
										warning: true,
										callback: (event, modal) => {
											model.disconnect().then(() => {
												model.remove().then(() => {
													$workspace.refresh().then(() => modal.close());
												});
											});
										}
									}, cancel: {
										default: true,
										label: $i18n.get('core.components.sidebar.workspace.removeWorkspaceModalBtnCancel')
									}
								}
							});
						},
						getList: (model) => {
							
							var projects = [];
							model.getAllProjects().then((results) => {
								projects.push.apply(projects, results);
							});
							return projects;
						},
						toolbarTemplate: 'core/components/sidebar/workspace/treeview/workspace.toolbar.html',
						beforeTemplate: 'core/components/sidebar/workspace/treeview/workspace.before.html'
					}, {
						///////////////////////////////
						// PROJECT
						///////////////////////////////
						canAdd: true,
						addLabel: $i18n.get('core.components.sidebar.workspace.addSegmentLabel'),
						emptyLabel: $i18n.get('core.components.sidebar.workspace.emptySegmentLabel'),
						getList: (model) => {
							
							var segments = [];
							model.getAllSegments().then((results) => {
								segments.push.apply(segments, results);
							});
							return segments;
						},
						onEdit: (model, parent, depth) => {
							$s.editProject(parent, model);
						},
						onAdd: (model, parent, depth) => {
							$s.editSegment();
						},
						onRemove: async (model, parent, depth) => {
							
							$modal.dialog('workspace_remove_project', {
								backdrop: true,
								title: $i18n.get('core.components.sidebar.workspace.projectRemoveTitle'),
								content: $i18n.get('core.components.sidebar.workspace.projectRemoveContent', {
									project: model.getData().name,
									workspace: parent.getName()
								}),
								buttons: {
									remove: {
										label: $i18n.get('core.components.sidebar.workspace.projectRemoveBtnRemove'),
										warning: true,
										callback: (event, modal) => {
											model.remove().then(() => {
												$workspace.refresh().then(() => modal.close());
											});
										}
									}, cancel: {
										default: true,
										label: $i18n.get('core.components.sidebar.workspace.projectRemoveBtnCancel')
									}
								}
							});
						},
						toolbarTemplate: 'core/components/sidebar/workspace/treeview/project.toolbar.html'
					}, {
						///////////////////////////////
						// SEGMENT
						///////////////////////////////
						canOpen: true,
						onEdit: (model, parent, depth) => {
							$s.editSegment(parent, model);
						},
						onRemove: (model, parent, depth) => {
							
							$modal.dialog('workspace_remove_segment', {
								backdrop: true,
								title: $i18n.get('core.components.sidebar.workspace.removeSegmentModalTitle'),
								content: $i18n.get('core.components.sidebar.workspace.removeSegmentModalContent', {
									segment: model.getData().name,
									project: parent.getData().name
								}),
								buttons: {
									remove: {
										label: $i18n.get('core.components.sidebar.workspace.removeSegmentModalBtnRemove'),
										warning: true,
										callback: (event, modal) => {
											model.remove().then(() => {
												$workspace.refresh().then(() => modal.close());
											});
										}
									}, cancel: {
										default: true,
										label: $i18n.get('core.components.sidebar.workspace.removeSegmentModalBtnCancel')
									}
								}
							});
						},
						beforeTemplate: 'core/components/sidebar/workspace/treeview/segment.before.html',
						toolbarTemplate: 'core/components/sidebar/workspace/treeview/segment.toolbar.html'
					}]
				};
				
				$s.editProject = (workspace, project = new ZmProject()) => {
					
					var title = !project.getKey()
						? $i18n.get('core.components.sidebar.workspace.addProjectTitle')
						: $i18n.get('core.components.sidebar.workspace.editProjectTitle');
						
					var btnLabel = !project.getKey()
						? $i18n.get('core.components.sidebar.workspace.projectBtnCreate')
						: $i18n.get('core.components.sidebar.workspace.projectBtnUpdate');
					
					$modal.dialog('workspace_add_project', {
						backdrop: true,
						title: title,
						directive: 'zm-workspace-project',
						onOpen: (modal) => {
							modal.bodyScope.project = new ZmProject(
								project.getKey(),
								project.getData()
							);
						},
						buttons: {
							add: {
								label: btnLabel,
								primary: true,
								disabled: (event, modal) => {
									let isValid = modal.bodyScope.project.isValid();
									return !isValid;
								},
								callback: (event, modal) => {
									modal.bodyScope.project.setWorkspace(workspace);
									modal.bodyScope.project.save().then(() => {
										$workspace.refresh().then(() => modal.close());
									});
								}
							},
							cancel: {
								label: $i18n.get('core.components.sidebar.workspace.projectBtnCancel')
							}
						}
					});
				};
				
				$s.editSegment = (project, segment = new ZmSegment()) => {
					
					var title = !segment.getKey()
						? $i18n.get('core.components.sidebar.workspace.addSegmentModalTitle')
						: $i18n.get('core.components.sidebar.workspace.editSegmentModalTitle');
						
					var btnLabel = !segment.getKey()
						? $i18n.get('core.components.sidebar.workspace.addSegmentModalBtnCreate')
						: $i18n.get('core.components.sidebar.workspace.editSegmentModalBtnUpdate');
					
					$modal.dialog('workspace_add_segment', {
						backdrop: true,
						title: title,
						directive: 'zm-workspace-segment',
						onOpen: (modal) => {
							modal.bodyScope.segment = new ZmSegment(
								segment.getKey(),
								segment.getData()
							);;
						},
						buttons: {
							add: {
								label: btnLabel,
								primary: true,
								disabled: (event, modal) => {
									return !modal.bodyScope.segment.isValid();
								},
								callback: (event, modal) => {
									
									modal.bodyScope.segment.setProject(project);
									modal.bodyScope.segment.save().then(() => {
										$workspace.refresh().then(() => modal.close());
									});
								}
							},
							cancel: {
								label: $i18n.get('core.components.sidebar.workspace.addSegmentModalBtnCancel')
							}
						}
					});
				};
				
				$s.connect = (workspace = new ZmWorkspace(null, {
					env: 'browser'
				})) => {
					
					var wasNew = workspace.getKey() === null;
					var title = workspace.getKey()
						? $i18n.get('core.components.sidebar.workspace.updateWorkspaceTitle')
						: $i18n.get('core.components.sidebar.workspace.connectWorkspaceTitle');
						
					var connectBtnLabel = workspace.getKey()
						? $i18n.get('core.components.sidebar.workspace.updateWorkspaceBtnUpdate')
						: $i18n.get('core.components.sidebar.workspace.updateWorkspaceBtnConnect');
					
					$modal.dialog('workspace_connect', {
						backdrop: true,
						title: title,
						directive: 'zm-workspace-connect',
						onOpen: (modal) => {
							modal.bodyScope.workspace = new ZmWorkspace(
								workspace.getKey(),
								workspace.getData()
							);
						},
						buttons: {
							connect: {
								label: connectBtnLabel,
								primary: true,
								disabled: (event, modal) => {
									
									let modalWorkspace = modal.bodyScope.workspace;
									let data = modalWorkspace.getData();
									
									return !modalWorkspace.isValid() || modalWorkspace.isConnecting()
										|| (
											(data.env === 'remote'
											&& workspace.getData().name === data.name
											&& workspace.getData().host === data.host
											&& workspace.getData().user === data.user
											&& workspace.getData().pass === data.pass)
										) || (
											data.env === 'browser'
											&& workspace.getData().name === data.name
										)
								},
								callback: (event, modal) => {
									
									modal.bodyScope.connect().then(() => {
										if(wasNew) {
											prepareSettings();
										}
										modal.close();
									});
								}
							}, cancel: {
								default: true,
								label: $i18n.get('core.components.sidebar.workspace.updateWorkspaceBtnCancel')
							}
						}
					});
				};
				
				$s.settings = settings.sidebar.workspace;
				$s.workspaces = workspaces;
				$s.filters = filters;
				$s.stats = stats;
			}
		}
	}]);
})();