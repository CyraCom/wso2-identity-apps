/**
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import {IdentityProviderClaimInterface, IdentityProviderCommonClaimMappingInterface} from "../../../../models";
import {Input, Label, Table} from "semantic-ui-react";
import React, {FunctionComponent, ReactElement} from "react";
import _ from "lodash";


interface AttributeListItemPropInterface {
    attribute: IdentityProviderClaimInterface;
    placeholder: string;
    updateMapping?: (mapping: IdentityProviderCommonClaimMappingInterface) => void;
    mapping?: string;
}

/**
 * Selected Attribute list item.
 *
 * @param props AttributeListItemPropInterface
 */
export const AttributeListItem: FunctionComponent<AttributeListItemPropInterface> = (
    props
): ReactElement => {

    const {
        attribute,
        updateMapping,
        mapping,
        placeholder
    } = props;

    const handleClaimMapping = (e) => {
        const mappingValue = e.target.value;
        updateMapping({
            claim: attribute,
            mappedValue: mappingValue
        } as IdentityProviderCommonClaimMappingInterface);
    };

    return (
        <Table.Row>
            <Table.Cell>
                { attribute?.displayName }
            </Table.Cell>
            {
                <>
                    <Table.Cell error={ _.isEmpty(mapping) }>
                        <Input
                            placeholder={ placeholder }
                            value={ _.isEmpty(mapping) ? "" : mapping }
                            onChange={ handleClaimMapping }
                            required
                        />
                        { _.isEmpty(mapping) &&
                        (
                            <Label
                                basic color='red'
                                pointing='left'>
                                Please enter a value
                            </Label>
                        ) }
                    </Table.Cell>
                </>
            }
        </Table.Row>
    );
};