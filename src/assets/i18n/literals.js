Zemit.app.run(['$i18n', function($i18n) {$i18n.load('en_CA', {"core":{"components":{"sidebar":{"tabs":{"modules":"Modules","debug":"Debug","media":"Media","widgets":"Widgets","workspace":"Workspace"},"modules":{"applyTitle":"Apply changes","applyContent":"Applying the changes will refresh the application. Do you wish to proceed?","applyBtn":"Apply","filterPlaceholder":"Filter the list of modules...","noticeIntro":"","noModulesFound":"No module has been found based on your search query.","empty":"Sorry, no module available yet.","noModuleFound":"No module found based on your search query."},"debug":{"actionsBtnDump":"Dump session to console","actionsBtnFlushHistory":"Flush history only","actionsBtnFlushMemory":"Flush memory","actionsTitle":"Actions","actionsWarning":"<strong>Warning!</strong> Use these actions with caution.","clearConsole":"Clear console","detailsTitle":"Details","flushBtn":"Flush all","flushContent":"Are you sure you want to flush everything you have in memory?","flushTitle":"Flush all","history":"History:","logsEmpty":"No log available yet.","logsTitle":"Logs","maxLogs":"Max logs:","selectedWidgets":"Selected widgets:","settings":{"showWidgetTokenId":"Show widget tokens & IDs"},"settingsTitle":"Settings","totalWidgets":"Total widgets:","version":"Version:"},"media":{"btnAddMedia":"Add new media","empty":"No media available yet.","filterPlaceholder":"Filter media...","images":"Images","noMediaFound":"No media found based on your search criteria.","noticeIntro":"Every media added in your document is added here beforehand."},"tooltips":{"debug":"Show debugging information","help":"Show help boxes","zemit":"We're Zemit, check us out!"},"widgets":{"filterPlaceholder":"Filter widgets...","noWidgetsFound":"No widget found based on your search criteria.","noticesDesktopDrag":"Add widgets by dragging them into your container.","noticesMobileDrag":"Tap and hold a widget to drag it into your content."},"workspace":{"addProjectLabel":"Add a project","addProjectTitle":"Add new project","addSegmentLabel":"Add a segment","addSegmentModalBtnCancel":"Cancel","addSegmentModalBtnCreate":"Create","addSegmentModalTitle":"Add new segment","btnAddNewWorkspace":"Add a new workspace","connect":{"browser":"Browser","browserTooltip":"Data will be saved in your browser session","envTitle":"Environment:","hostPlaceholder":"ex: ws.zemit.com","hostTitle":"Host:","namePlaceholder":"ex: Zemit","nameTitle":"Name:","passTitle":"Password:","remote":"Remote","userPlaceholder":"ex: unclebob","userTitle":"User:"},"connectWorkspaceTitle":"Connect to workspace","editProjectTitle":"Edit project","editSegmentModalBtnUpdate":"Update","editSegmentModalTitle":"Edit segment","emptyProjectLabel":"No project available yet.","emptySegmentLabel":"No segment available yet.","filterPlaceholder":"Search in all workspaces...","noProjectAdd":"No project yet, add one:","noWorkspaceJoined":"No workspace joined yet.","noticeExplanation":"Each workspaces contains projects which contains segments. A segment is like a page but it can instanciates other segments.","project":{"namePlaceholder":"ex: McGill University","nameTitle":"Name:"},"projectBtnCancel":"Cancel","projectBtnCreate":"Create","projectBtnUpdate":"Update","projectRemoveBtnCancel":"Cancel","projectRemoveBtnRemove":"Remove","projectRemoveContent":"Are you sure you want to remove the project <strong>:project:</strong> from your workspace <strong>:workspace:</strong>?","projectRemoveTitle":"Remove project","removeSegmentModalBtnCancel":"Cancel","removeSegmentModalBtnRemove":"Remove","removeSegmentModalContent":"Are you sure you want to remove the segment <strong>:segment:</strong> from your project <strong>:project:</strong>?","removeSegmentModalTitle":"Remove segment","removeWorkspaceModalBtnCancel":"Cancel","removeWorkspaceModalBtnRemove":"Remove","removeWorkspaceModalContent":"Are you sure you want to remove <strong>:workspace:</strong> from your workspaces?","removeWorkspaceModalTitle":"Remove workspace","segment":{"namePlaceholder":"ex: Footer","nameTitle":"Name:"},"treeview":{"segmentTotalWidgets":"Total widgets:"},"tryAgain":"Try again","updateWorkspaceBtnCancel":"Cancel","updateWorkspaceBtnConnect":"Connect","updateWorkspaceBtnUpdate":"Update","updateWorkspaceTitle":"Connect to workspace","btnEdit":"Edit","btnRemove":"Remove","workspaceRemoveBtnCancel":"Cancel","workspaceRemoveBtnRemove":"Remove","workspaceRemoveContent":"Are you sure you want to remove the project <strong>:project:</strong> from your workspace <strong>:workspace:</strong>?","workspaceRemoveTitle":"Remove workspace"}},"doc":{"title":"Documentation"},"toolbar":{"doc":"Doc","openWorkspaceDrawer":"Open the Workspace drawer and select or create a workspace/project/segment.","preview":"Preview","structure":"Structure","tooltip":{"changeMode":"Change edition mode","clearDoc":"Clear document","doc":"Documentation","export":"Export","import":"Import","redo":"Redo","undo":"Undo"},"workspaceSaved":"Saved"},"widget":{"column":{"desc":"Use it to divide your rows in more columns","title":"Column"},"container":{"actions":{"duplicate":"Duplicate","edit":"Edit","remove":"Remove"},"no-segment":"No segment loaded, please select of create a segment from the workspace drawer.","notices":{"clickHoldDrag":"Click and hold the selection to drag it around.","numberColumn":"Choose the number of column(s) you desire.","openWidget":"Open the widget drawer and select or create a workspace/project/segment.","standalone":"Enjoy a <strong>full screen</strong> experience by adding this app on your home screen. Check your browser options!","startAddingRow":"Start by opening the widgets drawer and adding a new row.","taploopParent":"Tap multiple time the same widget to loop through its parents. Now tap and hold the selection to drag it around."}},"default":{"add":{"content":"Content","customizable":"Customizable","modalAddTitle":"Add a new widget","structure":"Structure"}},"image":{"desc":"A picture, icon or drawing","title":"Image"},"row":{"desc":"An horizontal line that contains columns","title":"Row"},"text":{"desc":"Content with basic formatting","overlay":{"title":"Edit text content"},"title":"Text"}}},"classes":{"errAlreadyConn":"A connection has already been established to that server.","errConnLost":"The connection has been lost. Is the server down?","errConnTimeout":"The connection has timed out.","errNotResponding":"The server is either not responding or the information provided are incorrect.","errUserPassIncorrect":"The username and/or password provided are incorrect."},"di":{"cache":{"debugTitle":"Cache events"},"modal":{"btnCancel":"Cancel","btnOk":"OK","errNotFound":"Modal :id: not found.","errorTitle":"Error","infoTitle":"Info","warningTitle":"Warning"},"storage":{"errModelNotInitiated":"Model :name: not initiated."},"zm":{"clearContentBtn":"Clear content","clearContentContent":"Are you sure you want to clear your content?","clearContentTitle":"Clear content","errImportWrongFormatContent":"The file you are trying to import doesn't seem to be in a valid Zemit file format.","errImportWrongFormatTitle":"Wrong file format","importCompleteContent":"Your workspace has been updated with the imported data.","importCompleteTitle":"Data imported","importVerMismatchContent":"The version you are using (:currentVersion:) does not match the imported one (:importedVersion:)","importVerMismatchTitle":"Version mismatch","modalExportContent":"The content has been automatically downloaded into your computer.","modalExportTitle":"Content exported"}},"directives":{"draggable":{"debugTitle":"Draggable events"},"field":{"treeview":{"btnAdd":"Add","btnEdit":"Edit","btnOpen":"Open","btnRemove":"Remove","listEmpty":"No data available yet."}},"modal":{"btnClose":"Close","debugTitle":"Modal events"},"tooltip":{"debugTitle":"Tooltip events"}},"model":{"notValidate":"Model does not validate."},"services":{"media":{"errResizeNoWidthHeight":"Resized image must have either a width or height value."},"workspace":{"errAlreadyExists":"Workspace already exists.","errUnableConnectCred":"Unable to connect to the server using the provided credentials."}},"modules":{"misc":"Miscellaneous","widget":"Widgets"}},"widget":{"code":{"desc":"Hand code a segment yourself","title":"Code"},"partial":{"desc":"A local or remote partial to inject within the widget","title":"Partial"},"segment":{"desc":"Link another segment into your content","title":"Segment"}},"modules":{"widget":{"code":{"title":"Code Editor","desc":"Allows to write custom HTML/JS/CSS inside your segment."},"partial":{"title":"Partial","desc":"Allows to load a local or remote HTML partial inside your segments."},"segment":{"title":"Segment","desc":"Allows to imbricate segments within each other."}},"misc":{"easteregg":{"title":"EasterEgg","desc":"This module hides a little secret inside the Layout Engine. Will you find it? :-)","modalTitle":"Once upon a time in 2014"},"example":{"title":"Example","desc":"Inspect the code of this module to understand how you can develop new ones."}}}});$i18n.load('fr_CA', {"core":{"classes":{"errAlreadyConn":"Une connection a été établis avec succès.","errConnLost":"La connection a été perdu. Est-ce que le serveur est en panne?","errConnTimeout":"La connection a expirée.","errNotResponding":"Le serveur ne répond pas ou les informations fournis sont incorrect.","errUserPassIncorrect":"Le nom d'utilisateur et/ou mot de passe fournis sont incorrect."},"components":{"doc":{"title":"Documentation"},"sidebar":{"debug":{"actionsBtnDump":"Déverser la session dans la console","actionsBtnFlushHistory":"Vider l'historique uniquement","actionsBtnFlushMemory":"Vider la mémoire","actionsTitle":"Actions","actionsWarning":"<strong>Attention !</strong> Utilisez ces actions avec précaution !","clearConsole":"Nettoyer la console","detailsTitle":"Détails","flushBtn":"Vider tout","flushContent":"Êtes-vous certain de vouloir vider toutes les données de la mémoire?","flushTitle":"Vider tout","history":"Historique:","logsEmpty":"Pas d'enregistrement disponible pour le moment.","logsTitle":"Journaux","maxLogs":"Enr. max:","selectedWidgets":"Widgets sélectionnés:","settings":{"showWidgetTokenId":"Voir les tokens and IDs des widgets"},"settingsTitle":"Paramètres","totalWidgets":"Total des widgets:","version":"Version:"},"media":{"btnAddMedia":"Ajouter un nouveau média","empty":"Aucun média disponible pour le moment.","filterPlaceholder":"Filtrer les medias...","images":"Images","noMediaFound":"Aucun média trouvé basé sur vos critères de recherche.","noticeIntro":"Tous les médias ajoutés dans votre document sont ajoutés ici avant-tout."},"tabs":{"debug":"Débogage","media":"Média","widgets":"Widgets","workspace":"Espaces"},"tooltips":{"debug":"Montrer les informations de débogages","help":"Voir les panneaux d'aides","zemit":"Nous sommes Zemit, passez nous voir !"},"widgets":{"filterPlaceholder":"Filtrer les widgets...","noWidgetsFound":"Aucun widget trouvé basé sur vos critères de recherche.","noticesDesktopDrag":"Ajouter des widgets en les déplacants dans votre conteneur.","noticesMobileDrag":"Presser et tener un widget pour le déplacer dans votre contenu."},"workspace":{"addProjectLabel":"Ajouter un projet","addProjectTitle":"Ajouter un nouveau projet","addSegmentLabel":"Ajouter un segment","addSegmentModalBtnCancel":"Annuler","addSegmentModalBtnCreate":"Créer","addSegmentModalTitle":"Ajouter un nouveau segment","btnAddNewWorkspace":"Ajouter un nouvel espace","connect":{"browser":"Navigateur","browserTooltip":"Les données seront sauvegardées dans votre session navigateur","envTitle":"Environnement :","hostPlaceholder":"ex: ws.zemit.com","hostTitle":"Hôte :","namePlaceholder":"ex: Zemit","nameTitle":"Nom :","passTitle":"Mot de passe :","remote":"Distant","userPlaceholder":"ex: onclebob","userTitle":"Utilisateur :"},"connectWorkspaceTitle":"Se connecter à un espace","editProjectTitle":"Modifier un projet","editSegmentModalBtnUpdate":"Mettre à jour","editSegmentModalTitle":"Modifier un segment","emptyProjectLabel":"Aucun projet disponible pour le moment.","emptySegmentLabel":"Aucun segment disponible pour le moment.","filterPlaceholder":"Recherchez dans tous les espaces...","noProjectAdd":"Aucun projet pour le moment, ajoutez-en un :","noWorkspaceJoined":"Aucun espace rejoint encore.","noticeExplanation":"Chaque espace contient des projets qui contiennent des segments. Un segment est comme une page, mais il peut contenir d'autres segments.","project":{"namePlaceholder":"ex: Université McGill","nameTitle":"Nom :"},"projectBtnCancel":"Annuler","projectBtnCreate":"Créer","projectBtnUpdate":"Metter à jour","projectRemoveBtnCancel":"Annuler","projectRemoveBtnRemove":"Effacer","projectRemoveContent":"Êtes-vous certain de vouloir effacer le projet <strong>:project:</strong> de l'espace <strong>:workspace:</strong> ?","projectRemoveTitle":"Effacer un projet","removeSegmentModalBtnCancel":"Annuler","removeSegmentModalBtnRemove":"Effacer","removeSegmentModalContent":"Êtes-vous certain de vouloir effacer le segment <strong>:segment:</strong> du projet <strong>:project:</strong> ?","removeSegmentModalTitle":"Effacer un segment","removeWorkspaceModalBtnCancel":"Annuler","removeWorkspaceModalBtnRemove":"Effacer","removeWorkspaceModalContent":"Êtes-vous certain de vouloir effacer <strong>:workspace:</strong> de vos espaces ?","removeWorkspaceModalTitle":"Effacer un espace","segment":{"namePlaceholder":"ex: Mise en page principale","nameTitle":"Nom :"},"treeview":{"segmentTotalWidgets":"Total des widgets :"},"tryAgain":"Essayez de nouveau","updateWorkspaceBtnCancel":"Annuler","updateWorkspaceBtnConnect":"Connecter","updateWorkspaceBtnUpdate":"Mettre à jour","updateWorkspaceTitle":"Mettre à jour un espace","btnEdit":"Modifier","btnRemove":"Effacer","workspaceRemoveBtnCancel":"Annuler","workspaceRemoveBtnRemove":"Effacer","workspaceRemoveContent":"Êtes-vous certain de vouloir effacer le projet <strong>:project:</strong> de l'espace <strong>:workspace:</strong> ?","workspaceRemoveTitle":"Effacer un espace"}},"toolbar":{"doc":"Doc","openWorkspaceDrawer":"Ouvrez le tirroir à espaces pour sélectionner ou créer un espace/projet/ segment.","preview":"Aperçu","structure":"Structure","tooltip":{"changeMode":"Changer le mode d'édition","clearDoc":"Nettoyer le document","doc":"Documentation","export":"Exporter","import":"Importer","redo":"Refaire","undo":"Annuler"},"workspaceSaved":"Sauvergardé"},"widget":{"column":{"desc":"Utilisez-la pour diviser vos rangées en plusieurs colonnes","title":"Colonne"},"container":{"actions":{"duplicate":"Dupliquer","edit":"Modifier","remove":"Effacer"},"notices":{"clickHoldDrag":"Cliquer et tener votre sélection pour la déplacer au sein de votre conteneur.","numberColumn":"Choisissez le nombre de colonne(s) que vous désirez créer.","openWidget":"Ouvrez le tirroir à widget pour sélectionner ou créer un espace/projet/ segment.","standalone":"Profitez d'une expérience <strong>plein écran</strong> en ajoutant cette applicationà votre écran d'accueil. Vérifiez vos options de navigateur !","startAddingRow":"Débutez par ouvrir le tirroir à widgets et ajouter un nouvelle rangée.","taploopParent":"Tapper plusieurs fois le même widget pour parcourir ses parents. Maintenant, tapper et tener votre sélection pour la déplacer au sein de votre conteneur."}},"default":{"add":{"content":"Contenu","customizable":"Personalisable","modalAddTitle":"Ajouter un nouveau widget","structure":"Structure"}},"image":{"desc":"Une photo, icône ou dessin","title":"Image"},"row":{"desc":"Une ligne horizontale qui contient des colonnes","title":"Rangée"},"text":{"desc":"Contenu avec formattage de base","overlay":{"title":"Modifier le contenu textuel"},"title":"Texte"}}},"di":{"cache":{"debugTitle":"Événement de cache"},"modal":{"btnCancel":"Annuler","btnOk":"OK","errNotFound":"Fenêtre :id: non trouvé.","errorTitle":"Erreur","infoTitle":"Information","warningTitle":"Attention"},"storage":{"errModelNotInitiated":"Modèle :name: non initié."},"zm":{"clearContentBtn":"Nettoyez le contenu","clearContentContent":"Êtes-vous certain de vouloir nettoyer votre contenu ?","clearContentTitle":"Nettoyez le contenu","errImportWrongFormatContent":"Le fichier que vous tentez d'importer n'est pas dans un format valide.","errImportWrongFormatTitle":"Mauvais format de fichier","importCompleteContent":"Votre espace a été mis à jour avec les données importées.","importCompleteTitle":"Données importées","importVerMismatchContent":"La version que vous utilisez (:currentVersion:) ne correspond pas à celle importée (:importedVersion:)","importVerMismatchTitle":"Incompatibilité entre les versions","modalExportContent":"Le contenu a été automatiquement téléchargé sur votre ordinateur.","modalExportTitle":"Exporter le contenu"}},"directives":{"draggable":{"debugTitle":"Événements de déplacement"},"field":{"treeview":{"btnAdd":"Ajouter","btnEdit":"Modifier","btnOpen":"Ouvrir","btnRemove":"Effacer","listEmpty":"Aucune donnée disponible."}},"modal":{"btnClose":"Fermer","debugTitle":"Événements de fenêtre"},"tooltip":{"debugTitle":"Événements de d'info-bulles"}},"model":{"notValidate":"Le modèle ne valide pas."},"services":{"media":{"errResizeNoWidthHeight":"Vous devez fournir une largeur et une hauteur afin de redimensionner l'image."},"workspace":{"errAlreadyExists":"Cet espace existe déjà.","errUnableConnectCred":"Impossible de se connecter au serveur en utilisant les informations d'identification fournis."}}},"widget":{"code":{"desc":"Coder un segment à la main","title":"Code"},"partial":{"desc":"Un partiel locale ou distant à injecter au sein du widget","title":"Partiel"},"segment":{"desc":"Lier un autre segment à l'intérieur de votre contenu","title":"Segment"}},"modules":{"misc":{"easteregg":{"modalTitle":"Un titre... on s'en balance !"}}}});}]);