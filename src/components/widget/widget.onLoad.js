/**
 * Main widget directive (all widgets inherits from this one)
 * 
 * @author <contact@dannycoulombe.com>
 */
(function() {
	
	Zemit.app.directive('zmWidget', ['$compile', '$history', '$zm', '$device', function($compile, $history, $zm, $device) {
		return {
			restrict: 'E',
			replace: true,
			priority: 2,
			link: function($s, $e, attrs) {
				
				var namespace = 'zmWidget';
				var $element;
				
				$s.isDraggable = false;
				$s.isTouched = false;
				
				angular.extend($s.widget, {
					
					/**
					 * Unbind all events from widget
					 */
					unbindEvents: function(events) {
						
						if(!events) {
							$element.off('.' + namespace);
							interact($element[0]).draggable(false);
							$s.isDraggable = false;
						}
						else {
							events.forEach(function(name) {
								switch(name) {
									case 'draggable':
										$s.isDraggable = false;
										interact($element[0]).draggable(false);
										break;
									case 'drop':
										interact($element[0]).drop(false);
										break;
									default:
										$element.off(name + '.' + namespace);
										break;
								}
							});
						}
					},
					
					/**
					 * Bind all events on widget
					 */
					bindEvents: function() {
						
						var _this = this;
						var configs = this.getScope().configs;
						
						$element.on('dragHoverTouch', function(event, pos) {
							
							event.stopPropagation();
							event.clientX = pos.x;
							event.clientY = pos.y;
							
							$zm.widget.hovered.data.forEach(function(widget) {
								if(widget.getScope().isDropHover) {
									widget.getScope().isDropHover = false;
								}
							});
							
							$zm.widget.hovered.set(_this, true);
							if(!$zm.widget.hovered.data[0].getScope().isDropHover) {
								$zm.widget.hovered.data[0].getScope().isDropHover = true;
							}
							
							$zm.widget.hovered.data.forEach(function(widget) {
								widget.getScope().position.set(event);
							});
							
							$s.$apply();
						});
						
						if(configs.selectable !== false) {
							
							var dragging = false;
							// $element.on('touchstart.' + namespace, function(event) {
							// 	dragging = false;
							// 	$s.isTouched = true;
							// 	$s.$digest();
							// 	event.stopPropagation();
							// });
							// $element.on('touchend.' + namespace, function(event) {
								
							// 	$s.isTouched = false;
							// 	$s.$digest();
								
							// 	if (dragging) {
							// 		return;
							// 	}
							// });
							$element.on('touchmove.' + namespace, function(event) {
								
								dragging = true;
								
								var element = document.elementFromPoint(
									event.touches[0].clientX,
									event.touches[0].clientY
								);
								angular.element(element).trigger('dragHoverTouch', {
									x: event.touches[0].clientX,
									y: event.touches[0].clientY
								});
								
								if($zm.widget.drag.enabled) {
									event.preventDefault();
								}
							});
							
							$element.on('click.' + namespace, function(event) {
								
								var selectAll = event.shiftKey;
								var incremental = event.ctrlKey || event.metaKey;
								
								_this.select(selectAll, incremental);
								event.stopPropagation();
								$s.$apply();
							});
						}
						
						$element.on('mouseout.' + namespace, function() {
							
							$zm.widget.hovered.unset(_this);
							_this.removeHighlight();
							$s.$digest();
						});
						$element.on('mouseover.' + namespace, function(event) {
							
							$zm.widget.hovered.set(_this);
							_this.highlight(event);
							$s.$digest();
						});
						$element.on('mousemove.' + namespace, function(event) {
							
							_this.getScope().position.set(event);
							$s.$apply();
						});
						$s.$watch('config.context', function(nv, ov) {
							if(nv !== ov && nv === 'structure') {
								var $draggable = $element.find('.zm-widget-inner:eq(0)');
								interact($draggable[0]).draggable(true);
							}
							else if(nv !== ov) {
								var $draggable = $element.find('.zm-widget-inner:eq(0)');
								interact($draggable[0]).draggable(false);
							}
						});
						$s.$watch('isTouched', function(nv, ov) {
							if(nv !== ov) {
								$element.toggleClass('zm-touched', nv);
							}
						});
						$s.$watch('isDraggable', function(nv, ov) {
							if(nv !== ov) {
								$element.toggleClass('zm-draggable', nv);
							}
						});
						$s.$watch('isSelected', function(nv, ov) {
							if(nv !== ov) {
								$element.toggleClass('zm-selected', nv);
							}
						});
						$s.$watch('isHighlighted', function(nv, ov) {
							if(nv !== ov) {
								$element.toggleClass('zm-highlighted', nv);
							}
						});
							
						(function() {
							
							var $container = $s.container.getScope().$element.find('.zm-container-scrollable:eq(0)');
							
							if($s.configs.draggable !== false) {
								
								$s.isDraggable = true;
								
								var draggableOptions = {
									hold: 200,
									restrict: {
										endOnly: true,
										//restriction: $element.parents('.zm-container-scrollable:eq(0)')[0],
										elementRect: {
											top: 0,
											left: 0,
											bottom: 1,
											right: 1
										}
									},
									autoScroll: {
										container: $container[0]
									},
									onmove: function(event) {
										
										var target = event.target,
											// Keep the dragged position in the data-x/data-y attributes
											x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
											y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
										
										// Translate the element
										$draggable[0].style.transform = 'translate3d(' + (x + $container.scrollLeft() - event.interaction.initialScroll.x) + 'px, ' + (y + $container.scrollTop() - event.interaction.initialScroll.y) + 'px, 0)';
									
										// Update the position attributes
										target.setAttribute('data-x', x);
										target.setAttribute('data-y', y);
										
										event.stopPropagation();
									},
									onend: function(event) {
										
										var target = event.target;
										
										// Reset widget position
										$draggable[0].style.transform = '';
										target.removeAttribute('data-x');
										target.removeAttribute('data-y');
										
										// Unset dragged widget
										$zm.widget.drag.set(null);
									}
								};
								
								if(!$device.isTouch()) {
									draggableOptions.onstart = function(event) {
										
										// Set dragged widget
										$zm.widget.drag.set(_this);
										
										event.interaction.initialScroll = {
											y: $container.scrollTop(),
											x: $container.scrollLeft(),
										};
										event.interaction.dropState = {
											position: null,
											part: null,
											widget: null
										};
										event.interaction.isReady = true;
									};
								}
								else {
									draggableOptions.manualStart = true;
								}
								
								/**
								 * Move the element around
								 */
								var $draggable = $element.find('.zm-widget-inner:eq(0)');
								var interactObj = interact($draggable[0]).draggable(draggableOptions).styleCursor(false);
								
								if($device.isTouch()) {
									interactObj.on('hold', function(event) {
									
										var interaction = event.interaction;
										
										if(!interaction.interacting()) {
											
											// Set dragged widget
											var nearestSelected = _this;
											while(nearestSelected.hasParent()
											&& !nearestSelected.isSelected()
											&& !nearestSelected.getScope().configs.draggable) {
												
												nearestSelected = nearestSelected.getParent();
											}
											
											if(!nearestSelected.isSelected()) {
												_this.select();
												nearestSelected = _this;
											}
											
											if(nearestSelected.isSelected()) {
												
												$device.vibrate();
												
												$zm.widget.drag.set(nearestSelected);
												$draggable = nearestSelected.getScope().$element.find('.zm-widget-inner:eq(0)');
												
												event.interaction.initialScroll = {
													y: $container.scrollTop(),
													x: $container.scrollLeft(),
												};
												event.interaction.dropState = {
													position: null,
													part: null,
													widget: null
												};
												event.interaction.isReady = true;
										
												interaction.start({name: 'drag'},
													event.interactable,
													$draggable[0]
												);
											}
											else {
												event.interaction.stop();
											}
										}
									});
								}
							}
							
							if($element.length === 0) {
								return;
							}
								
							/**
							 * Accept widgets to be dropped inside
							 */
							if($s.configs.drop
							&& ($s.configs.drop.outside.enabled || $s.configs.drop.inside.enabled)) {
								
								// Retrieve the container and its placeholder
								var $placeholder = $s.container.getScope().$placeholder;
								
								var acceptWidgetOutside = function(configs, widget, hoveredWidget) {
									return configs.drop.outside.enabled
										&& checkAccept(configs.drop.outside.accept, widget, hoveredWidget)
										&& (!configs.drop.outside.decline || configs.drop.outside.decline.indexOf(widget.type) === -1)
								};
								
								var checkAccept = function(accept, widget, hoveredWidget) {
									
									if(accept instanceof Array) {
										return accept.indexOf(widget.type) !== -1
											|| accept.indexOf('*') !== -1;
									}
									else if(accept instanceof Function) {
										return accept(widget, hoveredWidget);
									}
								};
								
								/**
								 * Accept widgets to be dropped outside
								 */
								interact($element[0]).dropzone({
									accept: '.zm-widget-draggable',
									overlap: 'pointer',
									ondropactivate: function(event) {
										$element.addClass('zm-drop-activated');
									},
									ondropdeactivate: function(event) {
										$element.removeClass('zm-drop-activated');
									},
									ondragenter: function(event) {
										
									},
									ondropmove: function(event) {
										
										if(!event.interaction.isReady) {
											return;
										}
										
										var cursor = event.dragEvent.ctrlKey || event.dragEvent.metaKey ? 'copy' : 'move';
										
										// Set default drop effect to nothing
										$zm.widget.drag.resetCursor();
										
										var dropState = event.interaction.dropState;
										var hoveredWidgets = $zm.widget.hovered.getAll();
										var draggedWidget = $zm.widget.drag.get();
										var draggedElement = draggedWidget.getScope().$element;
										if(hoveredWidgets.length === 0 || !draggedWidget) {
											return;
										}
										
										// Loop through all widgets found and
										// if once match any of the conditions,
										// break the loop and end the process.
										widgetLoop: for(var hwk = 0; hwk < hoveredWidgets.length; hwk++) {
											
											var hoveredWidget = hoveredWidgets[hwk];
											var hoveredScope = hoveredWidget.getScope();
											var configs = hoveredScope.configs;
											var pos = hoveredScope.position;

											// If hovered widget is the same as the dragged
											// one, skip this process
											if(draggedWidget.token === hoveredWidget.token
											|| !configs.drop) {

												return;
											}
											
											if(dropState.widget) {
												dropState.widget.setDropInsideActivate(false);
											}
											
											var isSame = false;
											var isInside = configs.drop.inside.enabled
												//&& (!configs.drop.inside.ifEmpty || hoveredWidget.childs.length === 0)
												&& checkAccept(configs.drop.inside.accept, draggedWidget, hoveredWidget)
												&& (!configs.drop.inside.decline || configs.drop.inside.decline.indexOf(draggedWidget.type) === -1)
												&& hoveredScope.isDropHover;
											
											/**
											 * When dragging inside a widget, there might be other
											 * widgets inside. If those widgets (childs) accept outside widgets,
											 * we try to calculate the current position of the hovered widget (parent)
											 * and position the placeholder at the right spot next to the child.
											 */
											(function() {
												if(hoveredScope.isDropHover && hoveredWidget.childs.length) {
													
													var firstChild = hoveredWidget.childs[0];
													var firstChildScope = firstChild.getScope();
													var firstChildConfigs = firstChildScope.configs;
													var align = firstChildConfigs.drop.outside.align;
													var directions;
													switch(align) {
														case 'vertical':
															directions = ['left', 'pageX', 'outerWidth', 'x'];
															break;
														case 'horizontal':
															directions = ['top', 'pageY', 'outerHeight', 'y'];
															break;
													}
													
													// Check position of childs and try to select the nearest one
													var isFound = false;
													for(var i = 0; i < hoveredWidget.childs.length; i++) {
														
														var child = hoveredWidget.childs[i];
														
														if(acceptWidgetOutside(child.getScope().configs, draggedWidget, hoveredWidget)
														// Drag even position greater than widget position
														&& child.getScope().$element.offset()[directions[0]] <= event.dragmove[directions[1]]
														// Drag event position smaller than widget position + size
														&& (child.getScope().$element.offset()[directions[0]] + eval('child.getScope().$element.' + directions[2] + '()')) >= event.dragmove[directions[1]]) {
															
															// Not the dragged widget
															if(child.token !== draggedWidget.token) {
																
																hoveredWidget = child;
																hoveredScope = child.getScope();
																
																// Update position of the cursor hover the child widget
																hoveredScope.position.set(event.interaction.prevEvent, hoveredScope.$element[0]);
															}
															// Is the current dragged widget
															else {
																isSame = true;
																return;
															}

															isFound = true;
															break;
														}
													}
													
													// If no child widget match the parent position, try to place
													// the placeholder at the first or last position depending of its
													// current position in the current hovered widget.
													if(!isFound) {

														var firstChild = hoveredWidget.childs[0];
														var lastChild = hoveredWidget.childs[hoveredWidget.childs.length - 1];
														hoveredWidget = event.dragmove[directions[1]] <= firstChild.getScope().$element.offset()[directions[0]]
															? firstChild
															: event.dragmove[directions[1]] >= (lastChild.getScope().$element.offset()[directions[0]] + eval('lastChild.getScope().$element.' + directions[2] + '()'))
																? lastChild
																: hoveredWidget;
														
														// Hightlight current dragged element if it's the same
														if(hoveredWidget.token === draggedWidget.token) {
															isSame = true;
															return;
														}
														else {
															
															// Update position of the cursor hover the child widget
															hoveredScope = hoveredWidget.getScope();
															hoveredScope.position.set(event.dragmove, hoveredScope.$element[0]);
														}
													}
													
													// Update hovered widget, scope and configs for further usage below
													pos = hoveredScope.position;
													hoveredScope = hoveredWidget.getScope();
													configs = hoveredScope.configs;
													
													isInside = false;
												}
											})();
											
											if(isSame) {

												if($placeholder) {
													$placeholder[0].classList.add('zm-hidden');
												}
												
												dropState.widget = null;
												draggedElement.addClass('zm-drop-inside-activate');
												
												break widgetLoop;
											}
											
											if(draggedElement.hasClass('zm-drop-inside-activate')) {
												draggedElement.removeClass('zm-drop-inside-activate');
											}
											
											// Inside dropping
											if(isInside) {

												var align = configs.drop.inside.align;
												
												if($placeholder) {
													$placeholder[0].classList.add('zm-hidden');
												}
												
												dropState.widget = hoveredWidget;
												dropState.position = null;
												dropState.part = 'inside';
												
												// If a hook on the "can drop" verification has been
												// declared, try to run it.
												hoveredWidget.setDropInsideActivate(true,
													(configs.drop.canDrop instanceof Function
														? configs.drop.canDrop(draggedWidget, hoveredWidget)
														: true)
												);
												
												// Set default drop effect to copy if CTRL or Command key enabled
												$zm.widget.drag.setCursor(cursor);
												
												break widgetLoop;
											}
											// Outside dropping
											else if(acceptWidgetOutside(configs, draggedWidget, hoveredWidget)) {
//console.log("OUTSIDE");
												var align = configs.drop.outside.align;
												
												var position;
												switch(align) {
													case 'vertical':
														position = pos.x >= 50 ? 'after' : 'before';
														break;
													case 'horizontal':
														position = pos.y >= 50 ? 'after' : 'before';
														break;
												}
												
												if((!dropState.widget || (hoveredWidget.token !== dropState.widget.token))
												|| (!dropState.position || (position !== dropState.position))) {

													if(dropState.widget) {
														dropState.widget.setDropInsideActivate(false);
													}
													
													var $body = angular.element('body');
													var $hovEle = hoveredScope.$element;
													var placeholderRect = {
														width: '',
														height: '',
														x: '',
														y: ''
													};
													var placeClassList = $placeholder[0].classList;
													placeClassList.remove('zm-drop-placeholder-vertical', 'zm-drop-placeholder-horizontal');
													switch(align) {
														case 'vertical':
															placeholderRect.width = 3;
															placeholderRect.height = $hovEle.height();
															placeClassList.add('zm-drop-placeholder-vertical');
															break;
														case 'horizontal':
															placeholderRect.width = $hovEle.outerWidth();
															placeholderRect.height = 3;
															placeClassList.add('zm-drop-placeholder-horizontal');
															break;
													}
													
													var top = $hovEle.offset().top + (position === 'after' && align === 'horizontal' ? $hovEle.outerHeight() : 0);
													var left = $hovEle.offset().left + (position === 'after' && align === 'vertical' ? $hovEle.outerWidth() : 0)
													
													top -= ($container.offset().top - $body.offset().top);
													left -= ($container.offset().left - $body.offset().left);
													
													// Add the scrolling position
													top += $container.scrollTop();
													left += $container.scrollLeft();
													
													placeholderRect.y = top;
													placeholderRect.x = left;
													
													//dropState.hovered = hoveredWidget;
													dropState.widget = hoveredWidget;
													dropState.position = position;
													dropState.part = 'outside';
													
													$placeholder[0].classList.remove('zm-hidden');
													$placeholder.css({
														width: placeholderRect.width + 'px',
														height: placeholderRect.height + 'px',
														top: placeholderRect.y + 'px',
														left: placeholderRect.x + 'px'
														//transform: 'translate3d(' + placeholderRect.x + 'px, ' + placeholderRect.y + 'px, 0)'
													});
													
													placeClassList.remove('zm-drop-placeholder-before', 'zm-drop-placeholder-after');
													placeClassList.add('zm-drop-placeholder-' + position);
												}
												
												// Set default drop effect to copy if CTRL or Command key enabled
												$zm.widget.drag.setCursor(cursor);
												
												break widgetLoop;
											}
										}
									},
									ondragleave: function(event) {
//console.log('LEAVE', $s.widget.token);
										var dropState = event.interaction.dropState;
										
										if(dropState.widget) {
											
											var drag = $zm.widget.drag.get();
											var draggedElement = drag.getScope().$element;
											if(draggedElement.hasClass('zm-drop-inside-activate')) {
												draggedElement.removeClass('zm-drop-inside-activate');
											}
											
											// Remove original element and
											// placeholder from document
											dropState.widget.setDropInsideActivate(false);
											$placeholder[0].classList.add('zm-hidden');
											
											//dropState.widget.getScope().$element[0].classList.remove('zm-drop-inside-activate');
											dropState.widget = null;
											
											$s.$digest();
										}
									},
									ondrop: function(event) {
//console.log('DROP', $s.widget.token);
										var dropState = event.interaction.dropState;
										event.interaction.isReady = false;
										
										// Finalize callback
										var finalize = function(newWidget) {
																						
											// Hide placeholder
											$placeholder[0].classList.add('zm-hidden');
											
											var drag = $zm.widget.drag.get();
											var draggedElement = drag.getScope().$element;
											if(draggedElement.hasClass('zm-drop-inside-activate')) {
												draggedElement.removeClass('zm-drop-inside-activate');
											}
											
											if(newWidget) {
												
												switch(dropState.part) {
													case 'inside':
														// Insert dragged element at given position
														scope.widget.addNewChild(newWidget);
														
														// Unset hovered widget
														dropState.widget.setDropInsideActivate(false);
														break;
														
													case 'outside':
														// Insert dragged element at given position
														parent.addNewChild(newWidget, dropState.position === 'before'
																? index
																: index + 1);
														break;
												}
												
												// Unset the dragged widget
												// before removing it from the
												// document.
												$zm.widget.drag.set(null);
												
												// If CTRL or Command key are enabled, do not erase dragged element
												// (duplicate)
												if(!event.dragEvent.ctrlKey && !event.dragEvent.metaKey && !event.interaction.dontRemove) {
													drag.remove();
												}
											}
											
											// Digest scope
											$s.$apply();
											
											// Reselect widget
											if(newWidget && newWidget.getParent().isSelectable !== false) {
												newWidget.select();
												$s.$apply();
											}
										};
										
										// If no widget hovered, skip this
										// process and reset
										if(!dropState.widget) {
											return finalize(false);
										}
										
										// Clone dragged element
										var dragged = $zm.widget.drag.get();
										var clone = dragged.clone(event.dragEvent.ctrlKey || event.dragEvent.metaKey);
										var parent = dropState.widget.getParent();
										var scope = dropState.widget.getScope();
										var configs = scope.configs;
										var index = scope.$index;
										
										// If a hook on the drop callback has been
										// declared, try to run it.
										$zm.action(function() {
											(configs.drop.onDrop instanceof Function)
												? configs.drop.onDrop(clone, parent, index, dropState.part, finalize)
												: finalize(clone);
										});
									}
								}).styleCursor(false);
							}
						})();
					},
				
					/**
					 * Bind events on widget load
					 */
					onLoad: function(_$element) {
						
						$element = _$element;
						this.bindEvents();
						
						$s.hooks.run('onLoad', $element);
						
						setTimeout(function() {
							$e.addClass('zm-visible');
							setTimeout(function() {
								$e.addClass('zm-transform-completed');
							}, 250);
						});
					}
				});
			}
		};
	}]);
})();