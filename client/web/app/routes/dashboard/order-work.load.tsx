import type { FileValidated } from '@dropzone-ui/react'
import { DropzoneSpanish, Dropzone, FileItem } from '@dropzone-ui/react'
import { useState } from 'react'

export default function LoadOrderWorkPage() {
	const [files, setFiles] = useState<FileValidated[]>([])
	const updateFiles = (incommingFiles: FileValidated[]) => {
		setFiles(incommingFiles)
	}
	return (
		<Dropzone onChange={updateFiles} value={files}>
			{files.map((file) => (
				<FileItem {...file} preview key={file.id} />
			))}
		</Dropzone>
	)
}
