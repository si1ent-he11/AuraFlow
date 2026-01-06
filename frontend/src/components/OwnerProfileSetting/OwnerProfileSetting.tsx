import ConfirmationInput from "../ConfirmationInput/ConfirmationInput"
import { useEffect, useState } from "react"
import useMember from "../../state/useMember"
import useActiveSpace from "../../state/useActiveSpace"
import { useGetSpace } from "../../hooks/space/useGetSpace"
import { useNavigate } from "react-router-dom"
import useChangeMemberName from "../../hooks/member/useChangeMemberName"
import useChangeSpaceName from "../../hooks/space/useChangeSpaceName"
import useChangeSpaceDesc from "../../hooks/space/useChangeSpaceDesc"
import type { ChangeMemberName } from "../../types/member"
import type { SpaceDescriptionDTO, SpaceNameDTO } from "../../types/space"
import Loader from "../../ui/Loader/Loader"
import cl from "./OwnerProfileSetting.module.css"

const OwnerProfileSetting = () => {
    const navig = useNavigate()
    const member = useMember(state => state.member)
    const spaceId = useActiveSpace(state => state.spaceId)
    
    const {mutate: mutateMemberName, isError: isErrorMemberName} = useChangeMemberName(spaceId!)
    const {mutate: mutateSpaceName, isError: isErrorSpaceName} = useChangeSpaceName(spaceId!)
    const {mutate: mutateSpaceDesc, isError: isErrorSpaceDesc} = useChangeSpaceDesc(spaceId!)
    const {data: currentSpaceSetting} = useGetSpace(spaceId!)

    const [usernameInSpace, setUsernameInSpace] = useState<string>("")
    const [spaceName, setSpaceName] = useState<string>("")
    const [spaceDesc, setSpaceDesc] = useState<string>("")

    useEffect(() => {
        if (currentSpaceSetting) {
            setSpaceName(currentSpaceSetting.spaceName)
            setSpaceDesc(currentSpaceSetting.spaceDescription)
        }
    }, [currentSpaceSetting])

    useEffect(() => {
        if (member) {
            setUsernameInSpace(member.usernameInSpace)
        }
    }, [member])

    useEffect(() => {
        if (isErrorMemberName || isErrorSpaceName || isErrorSpaceDesc) {
            navig("/error")
        }
    }, [isErrorMemberName, isErrorSpaceName, isErrorSpaceDesc, navig])

    if (!member || !spaceId || !currentSpaceSetting) {
        return <Loader />;
    }

    const validateName = (value: string) => {
        if (value.length < 6) return "min 6 characters"
        if (value.length > 40) return "max 40 characters"
        return null
    }
    
    const validateDescription = (value: string) => {
        if (value.length < 6) return "min 6 characters";
        if (value.length > 255) return "max 255 characters";
        return null;
    }

    return (
        <div className={cl.container}>
            <div>
                <h1 className={cl.info}>username in space</h1>
                <ConfirmationInput validate={validateName} value={usernameInSpace} setValue={setUsernameInSpace} onClick={() => mutateMemberName({usernameInSpace: usernameInSpace} as ChangeMemberName)} />
            </div>
            <div>
                <h1 className={cl.info}>space name</h1>
                <ConfirmationInput validate={validateName} value={spaceName} setValue={setSpaceName} onClick={() => mutateSpaceName({spaceName: spaceName} as SpaceNameDTO)} />
            </div>
            <div>
                <h1 className={cl.info}>space description</h1>
                <ConfirmationInput validate={validateDescription} value={spaceDesc} setValue={setSpaceDesc} onClick={() => mutateSpaceDesc({spaceDescription: spaceDesc} as SpaceDescriptionDTO)} />
            </div>
        </div>
    )
}

export default OwnerProfileSetting;