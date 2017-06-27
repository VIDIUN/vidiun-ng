import { MetadataProfile } from '@kaltura-ng/kaltura-common/metadata-profile';
import { MetadataItemTypes, MetadataItem } from '@kaltura-ng/kaltura-common';
import { KalturaMetadata } from 'kaltura-typescript-client/types/KalturaMetadata';
import { XmlParser } from '@kaltura-ng/kaltura-common/xml-parser';
import { DynamicSectionControl } from '../controls/dynamic-section-control';
import { KalturaUtils } from '@kaltura-ng/kaltura-common';
import { FormGroup } from '@angular/forms';
import { DynamicSectionFactory } from './dynamic-section-factory';
import { DynamicFormService } from '../dynamic-form.service';

export class KalturaCustomDataHandler
{
    private _dynamicSection : DynamicSectionControl;
    private _formGroup : FormGroup;
    private _dynamicSectionFactory = new DynamicSectionFactory();

    public get isReady() : boolean
    {
        return !!this._formGroup;
    }

    public get formGroup() : FormGroup
    {
        return this._formGroup;
    }

    public get dynamicSection() : DynamicSectionControl
    {
        return this._dynamicSection;
    }

    public get dirty() : boolean
    {
        return this._formGroup && this._formGroup.dirty;
    }

    public get metadataProfile() : MetadataProfile{
        return this._metadataProfile;
    }

    constructor(private _metadataProfile : MetadataProfile, private _dynamicFormService : DynamicFormService)
    {
        this._createDynamicSection();
    }

    private _createDynamicSection()
    {
        try {
            this._dynamicSection = this._dynamicSectionFactory.create(this._metadataProfile);
        }catch(e)
        {
            console.warn('[kaltura] -> could not create dynamic form from provided metadata profile scheme. Ignoring form data.'); // keep warning
        }
    }

    resetForm(serverMetadata? : KalturaMetadata) : void
    {
        if (this._dynamicSection && this._metadataProfile) {

            try {
                let formValue = {};

                if (this._metadataProfile && serverMetadata && serverMetadata.xml) {
                    const rawValue = XmlParser.toJson(serverMetadata.xml);
                    formValue = this._toFormValue(rawValue['metadata'], this._metadataProfile.items);
                }

                this._formGroup = this._dynamicFormService.toFormGroup(this._dynamicSection.children, {formValue: formValue});
                this._formGroup.reset(formValue);
            } catch (e) {
                this._formGroup = null;
            }
        }
    }

    getValue() : { xml? : string, error? : Error} {
        let result : { xml? : string, error? : Error} = null;
        if (this._formGroup && this._metadataProfile) {
            try {
                const parsedServerValue = this._toServerValue(this._formGroup.value, this._metadataProfile.items);
                result = {xml: '<metadata>' + XmlParser.toSimpleXml(parsedServerValue, {removeEmpty: true}) + '</metadata>'};
            } catch (e) {
                result = { error : e};
            }
        } else {
            result = {error: new Error("missing metadata profile arguments")};

        }

        return result;
    }

    private _toServerDateValue(date : Date) : number
    {
        if (date === null)
        {
            // ignore null values
        }else if (date instanceof Date) {
            return KalturaUtils.toServerDate(date);
        }else {
            throw new Error("expected value to be of type number")
        }
    }

    private _toServerValue(formValue : {}, fields : MetadataItem[]) : {} {
        let result = {};

        fields.forEach(field => {
            const fieldKey = field.name;
            const fieldValue: any = formValue[fieldKey];

            switch (field.type) {
                case MetadataItemTypes.Container:
                {
                    let value = null;

                    if (fieldValue) {
                        if (field.allowMultiple && fieldValue instanceof Array) {
                            value = fieldValue.map(fieldItem => {
                                return this._toServerValue(fieldItem,field.children);
                            });
                        } else if (!field.allowMultiple && fieldValue) {
                            value = this._toServerValue(formValue,field.children);
                        }
                    }

                    result[fieldKey] = value;
                }
                break;
                case MetadataItemTypes.Date: {
                    let value = null;

                    if (fieldValue) {
                        if (field.allowMultiple && fieldValue instanceof Array) {
                            value = fieldValue.map(fieldItem => {
                                return this._toServerDateValue(fieldItem[fieldKey]);
                            });
                        } else if (!field.allowMultiple && fieldValue) {
                            value = this._toServerDateValue(fieldValue);
                        }
                    }

                    result[fieldKey] = value;
                }
                    break;
                case MetadataItemTypes.Text:{
                    let value = null;

                    if (fieldValue) {
                        if (field.allowMultiple && fieldValue instanceof Array) {
                            value = fieldValue.map(fieldItem => {
                                return fieldItem[fieldKey];
                            });
                        } else if (!field.allowMultiple && fieldValue) {
                            value = fieldValue;
                        }
                    }

                    result[fieldKey] = value;
                }
                    break;
                case MetadataItemTypes.List: {
                    let value = null;

                    if (fieldValue) {
                        if (field.allowMultiple && fieldValue instanceof Array) {
                            value = fieldValue.map(fieldItem => {
                                return fieldItem;
                            });
                        } else if (!field.allowMultiple && fieldValue) {
                            value = fieldValue;
                        }
                    }

                    result[fieldKey] = value;
                }
                    break;
                case MetadataItemTypes.Object:
                {
                    let value = null;

                    if (fieldValue) {
                        if (fieldValue instanceof Array) {
                            value = fieldValue.map(fieldItem => {
                                return fieldItem;
                            });
                        }
                    }

                    result[fieldKey] = value;
                }
                    break;
            }
        });

        return result;
    }

    private _toFormValue(serverValue : {}, items : MetadataItem[]) : {} {
        let result = {};

        items.forEach(field => {
            const fieldKey = field.name;
            const fieldJSON: any = serverValue[fieldKey];

            switch (field.type) {
                case MetadataItemTypes.Container:
                    let value = null;

                    if (fieldJSON) {
                        if (field.allowMultiple) {
                            if (fieldJSON instanceof Array) {
                                value = fieldJSON.map(fieldItem => {
                                    return this._toFormValue(fieldItem, field.children);
                                });
                            } else {
                                value = [this._toFormValue(fieldJSON, field.children)];
                            }

                        } else if (!field.allowMultiple && fieldJSON.text) {
                            value = this._toFormValue(fieldJSON, field.children);
                        }
                    }

                    result[fieldKey] = value;
                    break;

                case MetadataItemTypes.Date: {
                    let value = null;

                    if (fieldJSON) {
                        if (field.allowMultiple) {
                            if (fieldJSON instanceof Array) {
                                value = fieldJSON.map(fieldItem => {
                                    return {[fieldKey]: KalturaUtils.fromServerDate(fieldItem.text)};
                                });
                            } else {
                                value = [{[fieldKey]: KalturaUtils.fromServerDate(fieldJSON.text)}];
                            }

                        } else if (!field.allowMultiple && fieldJSON.text) {
                            value = KalturaUtils.fromServerDate(fieldJSON.text);
                        }
                    }

                    result[fieldKey] = value;
                }
                    break;
                case MetadataItemTypes.Text:
                {
                    let value = null;

                    if (fieldJSON) {
                        if (field.allowMultiple) {
                            if (fieldJSON instanceof Array) {
                                value = fieldJSON.map(fieldItem => {
                                    return { [fieldKey] : fieldItem.text};
                                });
                            }else
                            {
                                value = [{ [fieldKey] : fieldJSON.text}];
                            }
                        } else {
                            value = fieldJSON.text;
                        }
                    }

                    result[fieldKey] = value;
                }
                    break;
                case MetadataItemTypes.List: {
                    let value = null;

                    if (fieldJSON) {
                        if (field.allowMultiple) {
                            if (fieldJSON instanceof Array) {
                                value = fieldJSON.map(fieldItem => {
                                    return fieldItem.text;
                                });
                            }else
                            {
                                value = [fieldJSON.text];
                            }

                        } else  {
                            value = fieldJSON.text;
                        }
                    }

                    result[fieldKey] = value;
                }
                    break;
                case MetadataItemTypes.Object:
                {
                    let value = null;

                    if (fieldJSON) {
                        if (field.allowMultiple) {
                            if (fieldJSON instanceof Array) {
                                value = fieldJSON.map(fieldItem => {
                                    return fieldItem.text;
                                });
                            }else
                            {
                                value = [fieldJSON.text];
                            }

                        } else  {
                            value = [fieldJSON.text];
                        }
                    }

                    result[fieldKey] = value;
                }
                    break;
            }
        });

        return result;
    }


}
