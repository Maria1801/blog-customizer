import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';
import { Select } from 'components/select';

import { FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import {
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

type ArticleParamsFormProps = {
	formState: typeof defaultArticleState;
	setFormState: React.Dispatch<
		React.SetStateAction<typeof defaultArticleState>
	>;
	resetHadnler: () => void;
	applyHadnler: () => void;
};

export const ArticleParamsForm = ({
	formState,
	setFormState,
	resetHadnler,
	applyHadnler,
}: ArticleParamsFormProps) => {
	const [isOpen, setOpen] = useState(false);
	const toggleOpen = (opened: boolean) => setOpen(!opened);

	const formRef = useRef<HTMLFormElement | null>(null);
	const changeFontFamily = (value: OptionType) =>
		setFormState({ ...formState, fontFamilyOption: value });
	const changeFontSize = (value: OptionType) =>
		setFormState({ ...formState, fontSizeOption: value });
	const changeFontColor = (value: OptionType) =>
		setFormState({ ...formState, fontColor: value });
	const changeBackgroundColor = (value: OptionType) =>
		setFormState({ ...formState, backgroundColor: value });
	const changeContentWidth = (value: OptionType) =>
		setFormState({ ...formState, contentWidth: value });

	const handleEsc = (event: KeyboardEvent) => {
		if (event.key === 'Escape') toggleOpen(true);
	};

	const handleOutsideClick = (event: MouseEvent) => {
		if (
			event.target instanceof Node &&
			!formRef.current?.contains(event.target)
		)
			toggleOpen(true);
	};

	useEffect(() => {
		window.addEventListener('keydown', handleEsc);
		window.addEventListener('mousedown', handleOutsideClick);
		return () => {
			window.removeEventListener('keydown', handleEsc);
			window.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isOpen]);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		applyHadnler();
	};

	return (
		<>
			<ArrowButton handler={() => toggleOpen(isOpen)} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}
				ref={formRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={resetHadnler}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder='Выберите шрифт'
						title='шрифт'
						onChange={changeFontFamily}
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title='размер шрифта'
						onChange={changeFontSize}
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						placeholder='Выберите цвет'
						title='цвет шрифта'
						onChange={changeFontColor}
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						placeholder='Выберите цвет'
						title='цвет фона'
						onChange={changeBackgroundColor}
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						placeholder='Выберите ширину'
						title='ширина контента'
						onChange={changeContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
