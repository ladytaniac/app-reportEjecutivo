import { Injectable } from '@angular/core';

// declare let cordova: any;

@Injectable()

export class ConfigDatosApp{
    public session: object;
    public arrayIdAccess: any[];
    public readonly _SERVICIOS: string= 'servicios';
    public readonly _VENTANILLATRAMITES: string= 'ventanilla';
    public readonly _RECURSOSHUMANOS: string= 'rrhh';
    public readonly _RECAUDACIONES: string= 'recaudaciones';
    public readonly _PROYECTOS: string= 'proyectos';
    public readonly _MONITOREO: string= 'monitoreo';
    public readonly _ATENCION: string= 'atencion';
    public readonly _EJECUCIONPRESUPUESTARIA: string= 'ejecucionpresupuestaria';
    private _menuSelect: string;
    private _tipo_plataforma: string;
    private _directorio_path: string;
    private readonly _ANDROID: string= 'android';
    private readonly _IOS: string= 'ios';
    private readonly _DIRECTORIO_ANDROID= 'file:///storage/emulated/0/Download/';
    private readonly _DIRECTORIO_IOS= "file:///Documents/";
    private readonly _dni_alcalde = '2352217'; // Alcalde
    private readonly _dni_secretario = '989806'; // hrico
    private readonly _dni_otherfuncionario = '3797829'; // saconeta
    // private readonly _DIRECTORIO_IOS= cordova.file.documentsDirectory;
    constructor(){
        this.session= {};
        this.arrayIdAccess = ['4008f585-9dc8-4217-94eb-3e119c2801bb', '8b06414e-9ee0-4460-bacf-6619420f5b3d']; //Aumentar los otros accesos
    }
    public set_tipo_plataforma(valor: string):void{
        this._tipo_plataforma=valor;
    }
    public isAndroid():boolean{
        return this._tipo_plataforma===this._ANDROID;
    }
    public isIOS():boolean{
        return this._tipo_plataforma===this._IOS;
    }
    public getDirectorio():string{
        return this.isAndroid()?this._DIRECTORIO_ANDROID:this.isIOS()?this._DIRECTORIO_IOS:"desconocido";
    }
    public getMenuSelect():string{
        return this._menuSelect;
    }
    public setMenuSelect(menuSelect):void{
        this._menuSelect= menuSelect;
    }
    public getDniAlcalde():string {
        return this._dni_alcalde;
    }
    public getDniSecretario():string {
        return this._dni_secretario;
    }
    public getDniOtherPerson():string {
        return this._dni_otherfuncionario;
    }
}