"use strict";angular.module("webappApp",["ngCookies","ngResource","ngSanitize","ui.router","angular-flexslider","angularFileUpload"]).config(["$stateProvider","$httpProvider","$locationProvider",function(a,b){b.responseInterceptors.push("httpInterceptor"),a.state("index",{url:"",views:{content:{templateUrl:"views/home.html",controller:"HomeCtrl"},topo:{templateUrl:"views/topo.html"},rodape:{templateUrl:"views/rodape.html"}}}).state("produtos",{url:"/product",views:{viewA:{template:"content product.html"},viewB:{template:"content product2.html"}}}).state("admin",{url:"/admin",views:{"admin.dashboard":{templateUrl:"views/admin/admindashboard.html"},"admin.menu":{templateUrl:"views/admin/menu.html"},topo:{templateUrl:"views/admin/topoadmin.html"},rodape:{templateUrl:"views/rodape.html"}}}).state("admincategoria",{url:"/admincategoria",views:{"admin.menu":{templateUrl:"views/admin/menu.html"},topo:{templateUrl:"views/admin/topoadmin.html"},"admin.content":{templateUrl:"views/admin/admincategoria.html",controller:"CategoriaAdminCtrl"},rodape:{templateUrl:"views/rodape.html"}}}).state("adminsubcategoria",{url:"/adminsubcategoria",views:{"admin.menu":{templateUrl:"views/admin/menu.html"},topo:{templateUrl:"views/admin/topoadmin.html"},"admin.content":{templateUrl:"views/admin/adminsubcategoria.html",controller:"SubcategoriaAdminCtrl"},rodape:{templateUrl:"views/rodape.html"}}}).state("adminproduto",{url:"/adminproduto",views:{"admin.menu":{templateUrl:"views/admin/menu.html"},topo:{templateUrl:"views/admin/topoadmin.html"},"admin.content":{templateUrl:"views/admin/adminproduto.html",controller:"ProdutoAdminCtrl"},rodape:{templateUrl:"views/rodape.html"}}})}]),angular.module("webappApp").factory("httpInterceptor",["$q",function(a){return function(b){return b.then(function(a){return $("#loading").hide(),a},function(b){return a.reject(b)})}}]),angular.module("webappApp").controller("HomeCtrl",["$scope","categoriaService",function(a,b){a.categorias=b.query(),a.slides=["images/slide_1.png","images/slide_2.png"],a.logos=["images/logo_seadoo.png","images/logo_diverite.png","images/logo_head.png","images/logo_sealife.png","images/logo_uwatec.png"]}]),angular.module("webappApp").controller("CategoriaAdminCtrl",["$scope","categoriaAdminService",function(a,b){a.categoria=new b,a.listCategorias=b.query(),a.categoria.status="Ativo",a.loading=!1,a.save=function(){a.loading=!0,a.categoria.id>0?a.update():a.categoria.$save(function(){a.categoria=new b,a.listCategorias=b.query(),a.reset(),alertify.success("As informações foram salvas com sucesso"),a.loading=!1},function(){alertify.error("Categoria Existente"),a.listCategorias=b.query(),a.loading=!1})},a.update=function(){a.loading=!0,a.categoria.$update(function(){a.listCategorias=b.query(),a.reset(),alertify.success("As informações foram salvas com sucesso"),a.loading=!1},function(){alertify.error("Categoria Existente"),a.listCategorias=b.query(),a.loading=!1})},a.reset=function(){a.categoria=new b,a.categoria.status="Ativo",a.loading=!1},a.edit=function(b){a.categoria=b}}]),angular.module("webappApp").controller("SubcategoriaAdminCtrl",["$scope","categoriaAdminService","subcategoriaAdminService",function(a,b,c){a.categoriaLabel="Selecione categoria",a.categorias=b.query(),a.subcategoria=new c,a.listSubcategorias=c.query(),a.subcategoria.status="Ativo",a.isVisibleButton=!0,a.loading=!1,a.changeCategoria=function(){a.categoriaLabel=a.subcategoria.categoria.nome},a.save=function(){a.loading=!0,a.subcategoria.id>0?a.update():a.insert()},a.update=function(){a.subcategoria.$update(function(){a.listSubcategorias=c.query(),a.reset(),alertify.success("As informações foram salvas com sucesso"),a.loading=!1},function(){alertify.error("Subcategoria Existente"),a.listSubcategorias=c.query(),a.loading=!1})},a.insert=function(){a.subcategoria.$save(function(){a.subcategoria=new c,a.listSubcategorias=c.query(),a.reset(),alertify.success("As informações foram salvas com sucesso"),a.loading=!1},function(){alertify.error("Subcategoria Existente"),a.listSubcategorias=c.query(),a.loading=!1})},a.reset=function(){a.subcategoria=new c,a.subcategoria.status="Ativo",a.categoriaLabel="Selecione categoria",a.loading=!1},a.edit=function(b){a.subcategoria=b,a.categoriaLabel=a.subcategoria.categoria.nome}}]),angular.module("webappApp").factory("categoriaService",["$resource",function(a){return a("../api/categoria")}]),angular.module("webappApp").factory("categoriaAdminService",["$resource",function(a){return a("../api/admincategoria",{},{update:{method:"PUT"}})}]),angular.module("webappApp").factory("subcategoriaAdminService",["$resource",function(a){return a("../api/adminsubcategoria",{},{update:{method:"PUT"}})}]),angular.module("webappApp").controller("ProdutoAdminCtrl",["$scope","$upload","produtoAdminService","subcategoriaAdminService",function(a,b,c,d){a.fileToUpload=null,a.produto=new c,a.listProdutos=c.query(),a.produto.status="Ativo",a.listSubcategoria=d.query(),a.subcategoriaLabel="Selecione subcategoria",a.loading=!1,a.alertSuccess=function(){alertify.success("As informações foram salvas com sucesso")},a.alertExist=function(){alertify.error("Produto já cadastrado")},a.save=function(){a.loading=!0,a.produto.id>0?a.update():a.produto.$save(function(){a.reset(),a.listProdutos=c.query(),a.alertSuccess(),a.loading=!1},function(b){console.log(b),a.alertExist(),a.listProdutos=c.query(),a.loading=!1})},a.update=function(){a.produto.$update(function(){a.listProdutos=c.query(),a.reset(),a.alertSuccess(),a.loading=!1},function(){a.alertExist(),a.listProdutos=c.query(),a.loading=!1})},a.reset=function(){$("#file").val(""),a.subcategoriaLabel="Selecione subcategoria",a.produto=new c,a.produto.status="Ativo",a.loading=!1},a.edit=function(b){a.produto=b,a.subcategoriaLabel=b.subcategoria.nome},a.changeSubcategoria=function(){a.subcategoriaLabel=a.produto.subcategoria.nome},a.setFileUpload=function(b){a.fileToUpload=b[0]},a.uploadFile=function(){a.uploading=!0,b.upload({url:"../api/adminproduto/upload",method:"POST",file:a.fileToUpload}).success(function(){alertify.success("Upload realizado com sucesso"),a.uploading=!1}).error(function(){alertify.error("Não foi possível realizar o upload"),a.uploading=!1})}}]),angular.module("webappApp").factory("produtoAdminService",["$resource",function(a){return a("../api/adminproduto/:upload",{},{update:{method:"PUT"}})}]);